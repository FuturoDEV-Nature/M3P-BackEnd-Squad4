'use strict';
// Esta tabela informa quais os papeis (roles) dos usuários (users).
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('userRoles', [
            {
				id: 1,
				userId: "1",
				roleId: "1",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
				userId: "2",
				roleId: "2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
				userId: "3",
				roleId: "2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
				userId: "4",
				roleId: "2",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
				id: 5,
				userId: "5",
				roleId: "3",
                createdAt: new Date(),
                updatedAt: new Date(),
		    }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('userRoles', null, {});
    }
};
