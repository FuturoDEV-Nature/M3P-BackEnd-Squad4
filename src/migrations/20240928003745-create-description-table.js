"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("descriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      local_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "locals",
          key: "id",
        },
      },
      data_visita: {
        type: Sequelize.DATE,
      },
      descricao: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("descriptions");
  },
};
