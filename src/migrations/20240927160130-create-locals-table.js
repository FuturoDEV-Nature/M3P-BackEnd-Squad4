"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
	await queryInterface.createTable(
		'local',
		{
		  id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		  },
		  name: {
			type: Sequelize.STRING
		  },
		  cep: {
			type: Sequelize.STRING
		  },
		  local_endereco: {
			type: Sequelize.STRING
		  },
		  userId: {
			type: Sequelize.INTEGER
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("local");
  },
};
