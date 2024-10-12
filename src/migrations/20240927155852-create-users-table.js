'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,  // Isso será interpretado como SERIAL em PostgreSQL
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        sexo: {
          allowNull: false,
          type: Sequelize.ENUM,
          values: ['masculino', 'feminino', 'outros']
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [11, 11]
          }
        },
        data_nascimento: {
          allowNull: false,
          type: Sequelize.DATE
        },
        endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        isLogged: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: "false"
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
