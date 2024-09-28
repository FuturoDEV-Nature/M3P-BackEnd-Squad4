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
		  description: {
			type: Sequelize.STRING
		  },
		  localidade: {
			type: Sequelize.STRING
		  },
		  userId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'user',
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("local");
  },
};
