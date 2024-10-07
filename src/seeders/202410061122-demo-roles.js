'use strict';
// Esta tabela informa quais são os "papéis" (roles) disponíveis da aplicação.
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('roles', [
            {
				id: 1,
				description: "admin", // administrador (full-acess)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
				description: "user", // usuário (private-acess)
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
				description: "guest", // visitante (public-acess)
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('roles', null, {});
    }
};
