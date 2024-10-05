const { default: axios } = require("axios");
const Description = require("../models/Description");
const Local = require("../models/Local");
const { userId } = require("../middleware/userId");

class LocalController {
  // Método para listar todos os Locais da Natureza do Usuário [ok]
  async listar(req, res) {
    // Chamada do middleware para verificar o token JWT
    userId(req, res, async () => {
      const userId = req.userId;

      try {
        const local = await Local.findAll({ where: { userId } });
        res.json(local);
      } catch (error) {
        res.status(500).json({ error: "Erro ao localizar Local da Natureza." });
      }
    });
  }

  // Método para cadastrar um Local da Natureza [ ok ]
  async cadastrar(req, res) {
    userId(req, req, async () => {
      const userId = req.userId;
      const { nome, local_endereco, desc_flora, desc_fauna } = req.body;

      try {
        // Cria o novo local
        const novoLocal = await Local.create({
          nome: nome,
          local_endereco: local_endereco,
          userId: userId,
        });

        const novaDescription = await Description.create({
          local_id: novoLocal.id,
          desc_fauna,
          desc_flora,
          data_visita: new Date(),
          userId: userId,
        });

        res.status(201).json({ local: novoLocal, description: novaDescription });
      } catch (error) {
        console.error("Erro ao cadastrar o local:", error);
        res.status(500).json({ error: "Erro ao cadastrar o local." });
      }
    });
  }

  // Método para mapear um local do Usuário pelo local_endereco [  ]
  async mapear(req, res) {
    // Chamada do middleware para verificar o token JWT
    userId(req, res, async () => {
      const userId = req.userId;
      const local_id = req.params.local_id;
      //console.log(local_id);
      //console.log(userId);

      try {
        const local = await Local.findOne({
          where: { id: local_id, userId: userId },
        });
        //console.log(local.local_endereco) testando o endereço do local
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
            local.local_endereco
          )}&format=json`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
          return res.status(200).json({ googleMapsLink, lat, lon });
        } else {
          return res
            .status(404)
            .json({ error: "Não foi possível encontrar o local." });
        }
      } catch (error) {
        console.error("Erro ao obter local:", error);
        res.status(500).json({ error: "Erro ao obter local." });
      }
    });
  }

  //Método para atualizar um local da Natureza na tabela de Descrições [ok]
  //Método para atualizar um local da Natureza na tabela de Locais da Natureza [ ok ]
  async atualizar(req, res) {
    userId(req, res, async () => {
      const userId = req.userId;
      const { local_id } = req.params;
      const { nome, local_endereco, desc_fauna, desc_flora, data_visita } =
        req.body;

      try {
        // Atualiza o local
        const localAtualizado = await Local.update(
          {
            nome: nome,
            local_endereco: local_endereco,
            userId: userId,
          },
          {
            where: {
              id: local_id,
            },
          }
        );

        // Atualiza as Descrições
        const descriptionAtualizada = await Description.update(
          {
            desc_fauna,
            desc_flora,
            data_visita,
            userId,
            local_id,
          },
          {
            where: {
              local_id: local_id,
            },
          }
        );

        res.status(200).json({ descriptionAtualizada, localAtualizado });
      } catch (error) {
        console.error("Erro ao atualizar a descrição do local:", error);
        res
          .status(500)
          .json({ error: "Erro ao atualizar a descrição do local." });
      }
    });
  }

  // Método para Apagar um local da Natureza [ok]
  async deletar(req, res) {
    userId(req, res, async () => {
      const userId = req.userId;
      const { local_id } = req.params;

      try {
        const localExistente = await Local.findOne({
          where: { id: local_id, userId: userId },
        });

        if (!localExistente) {
          return res.status(404).json({ error: "O local não existe." });
        }

        await Local.destroy({ where: { id: local_id } });
        res.status(204).end();
      } catch (error) {
        console.error(error, error);
        res.status(500).json({ error: "Erro ao deletar o local." });
      }
    });
  }
}

module.exports = new LocalController();
