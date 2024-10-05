'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.createTable(
		"descriptions",
		{
		  userId: {
			type: Sequelize.INTEGER,
			references: {
				model: 'users',
				key: "id"
			}
		  },
		  local_id: {
			type: Sequelize.INTEGER,
			references: {
				model: 'locals',
				key: "id"
			}
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
	await queryInterface.dropTable("descriptions")
  }
};
