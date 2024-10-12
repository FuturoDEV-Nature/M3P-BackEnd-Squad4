const { Router } = require('express');
const axios = require('axios'); // Importando o axios

const router = new Router();
const urlPrefix = "https://m3p-backend-squad4-t6lg.onrender.com"; 

// Rota para buscar todas as descrições
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${urlPrefix}/description`); // Chama a API para buscar descrições
        res.json(response.data); // Retorna os dados da resposta
    } catch (error) {
        console.error("Erro ao buscar descrições:", error.message);
        res.status(500).json({ error: "Erro ao buscar descrições", details: error.message });
    }
});

module.exports = router;
