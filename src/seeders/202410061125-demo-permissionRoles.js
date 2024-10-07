'use strict';
// Esta tabela informa as permissões (permissions) de cada papel (roles)
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('permissionRoles', [
            {
				id: 1,
				permissionId: "1", 	// id = 1 >> criar_usuario
				roleId: "1",		// id = 1 >> admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
				permissionId: "2",	// criar_local
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
				permissionId: "2",	// criar_local
				roleId: "2",		// usuario
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
				permissionId: "3", 	// remover_usuario
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
				id: 5,
				permissionId: "4",	// remover local
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
		    },
            {
                id: 6,
				permissionId: "5",	// ler_usuarios
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
				permissionId: "6", 	// editar_usuario
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
				id: 8,
				permissionId: "7",	// ler_locais
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
		    },{
				id: 9,
				permissionId: "8", 	// ler_permissoes
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 10,
				permissionId: "9",	// criar_permissao
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 11,
				permissionId: "10",	// ler_papeis
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 12,
				permissionId: "11",	// criar_papeis
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
				id: 13,
				permissionId: "12",	// ler_permissoes_papeis
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
		    },
            {
                id: 14,
				permissionId: "13",	// adicionar_permissao_papel
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 15,
				permissionId: "14", // adicionar_pepel_usuario
				roleId: "1",		// admin
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('permissionRoles', null, {});
    }
};
