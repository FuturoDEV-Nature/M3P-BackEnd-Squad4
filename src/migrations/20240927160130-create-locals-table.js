"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
	await queryInterface.createTable(
		'locals',
		{
		  id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		  },
		  nome: {
			type: Sequelize.STRING
		  },
		  localidade: {
			type: Sequelize.STRING
		  },
		  userId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'users',
				key: "id"
			}
		  },
		  lat: {
			type: Sequelize.STRING
		  },
		  lon: {
			type: Sequelize.STRING
		  },
		  createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		  },
		  updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		  }
		});

    // Define o id para começar a partir de 5
    await queryInterface.sequelize.query("ALTER TABLE locals AUTO_INCREMENT = 5;");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locals");
  },
};
