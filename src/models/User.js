const { connection } = require("../database/connection")
const {DataTypes} = require("sequelize")

const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
	sexo: {
		type: DataTypes.ENUM,
		values: ['masculino', 'feminino', 'outros']		
	},
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
	cpf: {
		type: DataTypes.NUMBER
		
	},
	data_nascimento: {
		type: DataTypes.DATE
	},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
})

module.exports = User