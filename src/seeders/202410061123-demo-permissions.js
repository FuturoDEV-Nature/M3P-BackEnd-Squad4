'use strict';
// Esta tabela informa quais são as pemissões (permissions) da aplicação.
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('permissions', [
            {
				id: 1,
				description: "criar_usuario", // criar novo usuário
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
				description: "criar_local", // adicionar novo local de preservação
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
				description: "remover_usuario", // deletar usuário
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
				description: "remover_local", // deletar local de preservação
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
				description: "ler_usuarios", // listar todos os usuarios
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
				description: "editar_usuario", // editar usuario
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
				description: "ler_locais", // listar todos os locais
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 8,
				description: "ler_permissoes", // listar permissões
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 9,
				description: "criar_permissao", // criar permissões
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
				description: "ler_papeis", // listar todos os papeis (roles)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
				description: "criar_papeis", // criar papéis (roles)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
				description: "ler_permissoes_papeis", // listar as permissões (permissions) de cada papel (roles)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 13,
				description: "adicionar_permissao_papel", // criar uma nova permissão (permissions) para um papel (roles)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 14,
				description: "adicionar_papel_usuario", // criar um papel (roles) para um usuário
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 15,
				description: "deletar_usuario", // nova tnetativa de incluir o metodo deletar
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('permissions', null, {});
    }
};
