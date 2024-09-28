'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	await queryInterface.createTable(
		'user',
		{
		  id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		  },
		  name: {
			allowNull: false,
			type: Sequelize.STRING
		  },
		  sexo: {
			type: Sequelize.ENUM,
			values: ['masculino', 'feminino', 'outros']
		  },
		  email: {
			allowNull: false,
			type: Sequelize.STRING,
			unique: true			
		  },
		  password: {
			type: Sequelize.STRING,
			allowNull: false
		  },
		  cpf: {
			type: Sequelize.STRING, // Mudei para STRING para lidar com zeros à esquerda
			allowNull: false,
			unique: true,
			validate: {
			  len: [11, 11] // Validação para garantir que o CPF tenha exatamente 11 caracteres
			}
		  },
		  data_nascimento: {
			allowNull: false,
			type: Sequelize.DATE
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
	  await queryInterface.dropTable('users');
	}
};