"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("descriptions", {
      id: {
        allowNull: false,
        autoIncrement: true,  // Para PostgreSQL, será tratado como SERIAL
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
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Define o valor inicial do id para começar a partir de 5
    await queryInterface.sequelize.query("ALTER SEQUENCE descriptions_id_seq RESTART WITH 5;");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("descriptions");
  },
};
