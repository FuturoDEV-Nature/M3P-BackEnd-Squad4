'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
		'role',
		{
			id: {
				allowNull: false,
				autoIncrement:true,
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			description: {
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
		})
	 await queryInterface.createTable(
		"permission",
		{
			id: {
				allowNull: false,
				autoIncrement:true,
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			description: {
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
     await queryInterface.createTable(
		"userRole", {
			id: {
				allowNull: false,
				autoIncrement:true,
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			userId: {
				type: Sequelize.INTEGER
			},
			roleId: {
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
     await queryInterface.createTable(
		"permissionRole", {
			id: {
				allowNull: false,
				autoIncrement:true,
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			permissionId: {
				type: Sequelize.INTEGER
			},
			roleId: {
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("role"); 
    await queryInterface.dropTable("permission"); 
    await queryInterface.dropTable("userRole"); 
    await queryInterface.dropTable("permissionRole"); 
  }
};
