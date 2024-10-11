'use strict';
// Esta tabela informa quais são os "papéis" (roles) disponíveis da aplicação.
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('locals', [
            {
				id: 1,
				nome: "Ilha do Campeche",
				localidade: "lha do Campeche, Campeche, Florianópolis - SC",
				userId: "1",
				lat: "-27.67045",
				lon: "-48.48144",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
			{
				id: 2,
				nome: "Parque Nacional da Serra da Canastra",
				localidade: "MG-341, São Roque de Minas - MG",
				userId: "1",
				lat: "-20.217",
				lon: "-46.833",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
				id: 3,
				nome: "Praia do forno",
				localidade: "Praia do Forno, Arraial do Cabo - RJ",
				userId: "1",
				lat: "-22.968879",
				lon: "-42.019195",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
				id: 4,
				nome: "Fervedouro do Ceiça",
				localidade: "Fervedouro do Ceiça, Mateiros - TO",
				userId: "1",
				lat: "-10,14759",
				lon: "-46,50135",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
			{
				id: 5,
				nome: "Pontal do Atalaia",
				localidade: "Pontal do Atalaia, Arraial do Cabo - RJ",
				userId: "1",
				lat: "-22.989598",
				lon: "-42.014858",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('locals', null, {});
    }
};
