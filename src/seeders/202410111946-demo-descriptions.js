'use strict';
// Esta tabela informa quais são os "papéis" (roles) disponíveis da aplicação.
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('descriptions', [
            {
				id: 1,
				userId: "1",
				local_id: "1",
				data_visita: "2024-01-01",
				descricao: "A Ilha do Campeche é uma ilha localizada em Florianópolis, próxima a ilha de Santa Catarina. Fica a cerca de 1,6 km ao leste da praia do Campeche, no Oceano Atlântico. Tem cerca de 1,6 km de comprimento no sentido norte-sul. Seu uso e conservação estão definidos na Portaria do IPHAN nº 691, de 23 de novembro de 2009",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
			{
				id: 2,
				userId: "1",
				local_id: "2",
				data_visita: "2024-01-01",
				descricao: "O Parque Nacional da Serra da Canastra é um dos mais importantes parques nacionais brasileiros, criado em 1972 através do decreto 70.355 de 1972. Dentro do parque está localizada a nascente histórica do rio São Francisco, no município de São Roque de Minas. Ótimo para trilhas, off-road, escaladas e cavalgadas.",
                createdAt: new Date(),
                updatedAt: new Date(),
            }, {
				id: 3,
				userId: "1",
				local_id: "3",
				data_visita: "2024-01-01",
				descricao:  "praia em Arraial do Cabo-RJ de águas cristalinas. O acesso é feito com uma trilha leve com duração de 10minutos ou barco táxi ",
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
				id: 4,
				userId: "1",
				local_id: "4",
				data_visita: "2024-01-01",
				descricao: "Piscina natural, pitoresca e de água azul transparente em um lugar cercado por bananeiras. Acesso bem fácil e não há trilha a ser percorrida. maximo de 10 pessoas ao mesmo tempo, havendo fila",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
			{
				id: 5,
				userId: "1",
				local_id: "5",
				data_visita: "2024-01-01",
				descricao: "O Pontal do Atalaia é um dos pontos mais bonitos de Arraial do Cabo, com vegetação nativa e as mais lindas praias do mundo.",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('descriptions', null, {});
    }
};
