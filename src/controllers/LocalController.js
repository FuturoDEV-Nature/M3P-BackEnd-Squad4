	const { default: axios } = require("axios");
	const Local = require("../models/Local");
	const { userId } = require("../middleware/userId");

	class LocalController {
		// Método para listar todos os Locais da Natureza do Usuário
		async listar(req, res) {
			const { userId } = req.body;
	
			try {
				const locais = await Local.findAll({ where: { userId } });
				res.json(locais);
			} catch (error) {
				console.error("Erro ao localizar Locais da Natureza:", error);
				res.status(500).json({ error: "Erro ao localizar Local da Natureza." });
			}
		}

// Método para cadastrar um Local da Natureza
async cadastrar(req, res) {
        const userId = req.userId;
        const { name, localidade, descricao, lat, lon } = req.body;

        // Validação básica dos dados
        if (!name || !localidade || !descricao || lat === undefined || lon === undefined) {
            return res.status(400).json({ error: "Dados incompletos. Verifique os campos obrigatórios." });
        }

        try {
            // Cria o novo local com latitude e longitude
            const novoLocal = await Local.create({
                name,
                localidade,
                userId,
				descricao,
                lat,
                lon
            });

            res.status(201).json({ local: novoLocal});
        } catch (error) {
            console.error("Erro ao cadastrar o local:", error);
            res.status(500).json({ error: "Erro ao cadastrar o local." });
        }
    };




	// Método para mapear um local do Usuário pelo localidade [ incompleto ]
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
			//console.log(local.localidade) testando o endereço do local
			const response = await axios.get(
			`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
				local.localidade
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

// Método para atualizar um local da Natureza.
async atualizar(req, res) {
    const { userId } = req.body; // Extraindo o userId do corpo da requisição
    const { local_id } = req.params;
    const { name, localidade, descricao, lat, lon, CEP} = req.body;

    try {
        // Atualiza o nome e o endereço na tabela de Locais da Natureza
        const [localAtualizado] = await Local.update(
            {
                name,
                localidade,
            },
            {
                where: {
                    id: local_id,
                    userId, // Adicionando userId para garantir que o usuário atualize apenas seus locais
                },
            }
        );

        // Verifica se o local foi atualizado
        if (!localAtualizado) {
            return res.status(404).json({ error: "Local não encontrado ou não pertence ao usuário." });
        }

       
    } catch (error) {
        console.error("Erro ao atualizar a descrição do local:", error);
        res.status(500).json({ error: "Erro ao atualizar a descrição do local." });
    }
}


	// Método para Apagar um local da Natureza
async deletar(req, res) {
    const { userId } = req.body; // Extraindo o userId do corpo da requisição
    const { local_id } = req.params;

    try {
        const localExistente = await Local.findOne({
            where: { id: local_id, userId },
        });

        if (!localExistente) {
            return res.status(404).json({ error: "O local não existe ou não pertence ao usuário." });
        }

        await Local.destroy({ where: { id: local_id } });
        res.status(204).end();
    } catch (error) {
        console.error("Erro ao deletar o local:", error);
        res.status(500).json({ error: "Erro ao deletar o local." });
    }
}

	}

	module.exports = new LocalController();
