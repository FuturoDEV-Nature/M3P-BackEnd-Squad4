
// Middleware para combinar usuários, locais e descrições
const combineUsersLocalsDescriptions = async (req, res, next) => {
	const urlPrefix = "https://m3p-backend-squad4-t6lg.onrender.com/";
	
    try {
        // Busca todos os usuários
        let users;
        try {
            const usersResponse = await axios.get(`${urlPrefix}/user`);
            users = usersResponse.data;

            if (!Array.isArray(users) || users.length === 0) {
                throw new Error("Nenhum usuário encontrado.");
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar usuários.", details: error.message });
        }

        // Busca todos os locais
        let locais;
        try {
            const locaisResponse = await axios.get(`${urlPrefix}/local`);
            locais = locaisResponse.data;

            if (!Array.isArray(locais) || locais.length === 0) {
                throw new Error("Nenhum local encontrado.");
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar locais.", details: error.message });
        }

        // Busca todas as descrições
        let descriptions;
        try {
            const descriptionsResponse = await axios.get(`${urlPrefix}/description`);
            descriptions = descriptionsResponse.data;

            if (!Array.isArray(descriptions) || descriptions.length === 0) {
                throw new Error("Nenhuma descrição encontrada.");
            }
        } catch (error) {
            return res.status(500).json({ error: "Erro ao buscar descrições.", details: error.message });
        }

        // Combina os dados de users, locais e descriptions
        let combinedData;
        try {
            combinedData = users.map(user => {
                const userLocals = locais.filter(local => local.userId === user.id);
                const userDescriptions = descriptions.filter(description => description.userId === user.id);

                if (!Array.isArray(userLocals)) {
                    throw new Error(`Erro ao relacionar locais com o usuário ID: ${user.id}`);
                }

                const locaisWithDescriptions = userLocals.map(local => {
                    const localDescriptions = userDescriptions.filter(description => description.local_id === local.id);
                    return {
                        ...local,
                        descriptions: localDescriptions
                    };
                });

                return {
                    ...user,
                    locais: locaisWithDescriptions
                };
            });
        } catch (error) {
            return res.status(500).json({ error: "Erro ao combinar os dados de usuários, locais e descrições.", details: error.message });
        }

        // Adiciona os dados combinados ao objeto de resposta (res.locals)
        res.locals.combinedData = combinedData;
        next(); // Continua para o próximo middleware ou rota
    } catch (error) {
        console.error("Erro geral:", error.message);
        return res.status(500).json({ error: "Erro inesperado ao combinar os dados.", details: error.message });
    }
};

module.exports = { combineUsersLocalsDescriptions };
