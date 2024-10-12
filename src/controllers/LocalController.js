const { default: axios } = require("axios");
const Description = require("../models/Description");
const Local = require("../models/Local");
const { userId } = require("../middleware/userId");

const axiosInstance = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    headers: {
        'User-Agent': 'SeuNome/SeuEmail', // Insira seu nome e e-mail ou nome do projeto
    },
});

class LocalController {
    // Método para listar todos os Locais da Natureza do Usuário [ok]
    async listar(req, res) {
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

    // Método para cadastrar um Local da Natureza [ ]
    async cadastrar(req, res) {
        userId(req, res, async () => {
            const userId = req.userId;
            const { name, localidade, descricao } = req.body;

            try {
                // Fazer requisição à API para obter latitude e longitude
                const response = await axiosInstance.get(
                    `/search.php?q=${encodeURIComponent(localidade)}&format=json`
                );

                // Verifica se obteve dados de latitude e longitude
                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];

                    // Cria o novo local com latitude e longitude
                    const novoLocal = await Local.create({
                        name,
                        localidade,
                        userId: userId,
                        lat: lat,  // Adiciona a latitude
                        lon: lon   // Adiciona a longitude
                    });

                    const novaDescription = await Description.create({
                        local_id: novoLocal.id,
                        descricao,
                        data_visita: new Date(),
                        userId: userId,
                    });

                    res.status(201).json({ local: novoLocal, description: novaDescription });
                } else {
                    res.status(404).json({ error: "Não foi possível obter a localização." });
                }
            } catch (error) {
                console.error("Erro ao cadastrar o local:", error);
                res.status(500).json({ error: "Erro ao cadastrar o local." });
            }
        });
    }

    // Método para mapear um local do Usuário pelo localidade [ ]
    async mapear(req, res) {
        userId(req, res, async () => {
            const userId = req.userId;
            const local_id = req.params.local_id;

            try {
                const local = await Local.findOne({
                    where: { id: local_id, userId: userId },
                });

                const response = await axiosInstance.get(
                    `/search.php?q=${encodeURIComponent(local.localidade)}&format=json`
                );

                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
                    return res.status(200).json({ googleMapsLink, lat, lon });
                } else {
                    return res.status(404).json({ error: "Não foi possível encontrar o local." });
                }
            } catch (error) {
                console.error("Erro ao obter local:", error);
                res.status(500).json({ error: "Erro ao obter local." });
            }
        });
    }

    // Método para atualizar um local da Natureza na tabela de Descrições [ ]
    async atualizar(req, res) {
        userId(req, res, async () => {
            const userId = req.userId;
            const { local_id } = req.params;
            const { name, localidade, descricao, data_visita } = req.body;

            try {
                // Atualiza o nome e o endereço na tabela de Locais da Natureza
                const localAtualizado = await Local.update(
                    {
                        name,
                        localidade: localidade,
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
                        descricao,
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
                res.status(500).json({ error: "Erro ao atualizar a descrição do local." });
            }
        });
    }

    // Método para Apagar um local da Natureza [ ]
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
