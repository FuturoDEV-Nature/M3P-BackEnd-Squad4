const User = require("../models/User");
const bcrypt = require('bcrypt');
const UserRole = require("../models/UserRole");

class UserController {
    // Método achar todos os usuários
    async findAll(request, response) {
        const data = await User.findAll({
            attributes: ['id', 'name', 'email', 'data_nascimento', 'endereco'],
            include: { association: 'roles', attributes: ['id', 'description'] }
        });
        const total = await User.count();

        return response.status(200).send({ records: data, total });
    }

    // Método achar usuário por ID
    async findById(request, response) {
        const { id } = request.params;
        const data = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'data_nascimento', 'endereco'] });

        if (!data) {
            return response.status(404).send({ message: "Usuário não encontrado" });
        }

        return response.status(200).send(data);
    }

    // Método criar um novo usuário
    async createNewUser(request, response) {
        try {
            const { email, name, senha, sexo, cpf, data_nascimento, cep, endereco } = request.body;
			console.log(":req.body.user",request.body)
            if (!email || !senha || !sexo || !cpf || !data_nascimento || !cep || !endereco) {
                return response.status(400).send({ message: "Todos os campos são obrigatórios" });
            }
            // Transformar sexo em lowercase
            const sexoLower = sexo.toLowerCase();

            const senhaEncriptada = await bcrypt.hash(senha, 10);

            const data = await User.create({
                email,
                name,
                senha: senhaEncriptada,
                sexo: sexoLower,
                cpf,
                data_nascimento,
				cep,
                endereco
            });

            return response.status(201).send(data);
        } catch (error) {
            console.log(error.message);
            return response.status(400).send({ message: "O usuário não pôde ser criado!" });
        }
    }

    // Método Atualizar usuário // Não pode alterar o CPF do usuário
    async updateUser(request, response) {
        try {
            const { id } = request.params;
            const { email, name, senha, data_nascimento, cep,  endereco } = request.body;

            const user = await User.findByPk(id);
            if (!user) {
                return response.status(404).send({ message: "Usuário não encontrado" });
            }

            const data = await user.update({
                email,
                name,
                senha,
                data_nascimento,
				cep,
                endereco
            });

            return response.status(200).send(data);
        } catch (error) {
            console.log(error.message);
            return response.status(400).send({ message: "O usuário não pôde ser atualizado!" });
        }
    }

		// Método deletar usuário
		async deleteUser(request, response) {
			try {
				const { id } = request.params;
	
				// Buscar o userId na tabela userRoles
				const userRoles = await UserRole.findAll({
					where: { userId: id }
				});
	
				if (userRoles.length > 0) {
					// Deletar as entradas relacionadas na tabela userRoles
					await UserRole.destroy({
						where: { userId: id }
					});
				}
	
				// Verificar se o usuário existe na tabela users
				const user = await User.findByPk(id);
				if (!user) {
					return response.status(404).send({ message: "Usuário não encontrado" });
				}
	
				// Deletar o usuário da tabela users
				await user.destroy();
	
				return response.status(204).send();
			} catch (error) {
				console.log(error.message);
				return response.status(400).send({ message: "O usuário não pôde ser deletado!" });
			}
		}
}

module.exports = new UserController();
