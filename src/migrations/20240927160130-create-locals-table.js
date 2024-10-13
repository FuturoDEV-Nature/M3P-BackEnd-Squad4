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
		  name: {
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
		  descricao: {
			type: Sequelize.TEXT
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("locals");
  },
};
