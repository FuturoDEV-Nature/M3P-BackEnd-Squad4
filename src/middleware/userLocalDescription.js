const combineUsersLocalsDescriptions = async (req, res, next) => {
	const urlPrefix = "https://m3p-backend-squad4-t6lg.onrender.com/";

	try {
		// Busca todos os usuários
		const usersResponse = await axios.get(`${urlPrefix}/user`);
		const users = usersResponse.data;

		if (!Array.isArray(users) || users.length === 0) {
			throw new Error("Nenhum usuário encontrado.");
		}

		// Busca todos os locais
		const locaisResponse = await axios.get(`${urlPrefix}/local`);
		const locais = locaisResponse.data;

		if (!Array.isArray(locais) || locais.length === 0) {
			throw new Error("Nenhum local encontrado.");
		}

		// Busca todas as descrições
		const descriptionsResponse = await axios.get(`${urlPrefix}/description`);
		const descriptions = descriptionsResponse.data;

		if (!Array.isArray(descriptions) || descriptions.length === 0) {
			throw new Error("Nenhuma descrição encontrada.");
		}

		// Combina os dados
		const response = {
			user: users,
			local: locais.map(local => {
				// Filtra as descrições relacionadas ao local
				const localDescriptions = descriptions.filter(description => description.local_id === local.id);

				// Retorna o local com a descrição
				return {
					...local,
					descricao: localDescriptions.map(desc => desc.description) // Mapeia para pegar apenas o texto da descrição
				};
			})
		};

		// Adiciona a resposta ao objeto de resposta (res.locals)
		res.locals.combinedData = response;
		next(); // Continua para o próximo middleware ou rota
	} catch (error) {
		console.error("Erro:", error.message);
		return res.status(500).json({ error: "Erro inesperado ao combinar os dados.", details: error.message });
	}
};

module.exports = { combineUsersLocalsDescriptions };
