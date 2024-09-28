'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.createTable(
		"action",
		{
		  userId: {
			type: Sequelize.INTEGER
		  },
		  local_id: {
			type: Sequelize.INTEGER
		  },
		  data_visita: {
			type: Sequelize.DATE
		  },
		  desc_fauna: {
			type: Sequelize.STRING
		  },

		  desc_flora: {
			type: Sequelize.STRING
		  }
		})
	},

  async down (queryInterface, Sequelize) {
	await queryInterface.dropTable("action")
  }
};