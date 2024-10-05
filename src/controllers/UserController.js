const User = require("../models/User");
const bcrypt = require('bcrypt');

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
            const { email, name, password, sexo, cpf, data_nascimento, endereco } = request.body;
            if (!email || !password || !sexo || !cpf || !data_nascimento || !endereco) {
                return response.status(400).send({ message: "Todos os campos são obrigatórios" });
            }

            // Validação de CPF ter 11 dígitos
            if (cpf.length !== 11) {
                return response.status(400).send({ message: "CPF deve ter 11 dígitos" });
            }

            // Validação de email único
            const existingUserEmail = await User.findOne({ where: { email } });
            if (existingUserEmail) {
                return response.status(400).send({ message: "Email já cadastrado" });
            }

            // Validação de CPF único
            const existingUserCpf = await User.findOne({ where: { cpf } });
            if (existingUserCpf) {
                return response.status(400).send({ message: "CPF já cadastrado" });
            }

            // Transformar sexo em lowercase
            const sexoLower = sexo.toLowerCase();

            const passwordEncriptada = await bcrypt.hash(password, 10);

            const data = await User.create({
                email,
                name,
                password: passwordEncriptada,
                sexo: sexoLower,
                cpf,
                data_nascimento,
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
            const { email, name, password, data_nascimento, endereco } = request.body;

            const user = await User.findByPk(id);
            if (!user) {
                return response.status(404).send({ message: "Usuário não encontrado" });
            }

            const data = await user.update({
                email,
                name,
                password,
                data_nascimento,
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

            const user = await User.findByPk(id);
            if (!user) {
                return response.status(404).send({ message: "Usuário não encontrado" });
            }

            await user.destroy();

            return response.status(204).send();
        } catch (error) {
            console.log(error.message);
            return response.status(400).send({ message: "O usuário não pôde ser deletado!" });
        }
    }
}

module.exports = new UserController();
