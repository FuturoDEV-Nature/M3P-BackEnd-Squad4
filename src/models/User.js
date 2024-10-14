const { connection } = require("../database/connection")
const {DataTypes} = require("sequelize")

const User = connection.define('users', {
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
    senha: {
        type: DataTypes.STRING,
    },
	cpf: {
		type: DataTypes.STRING
		
	},
	data_nascimento: {
		type: DataTypes.DATE
	},
	cep: {
		type: DataTypes.STRING
	},
	endereco:{
		type: DataTypes.STRING
	},
	isLogged:{
		type: DataTypes.BOOLEAN
	},
    createdAt: DataTypes.DATE,								
    updatedAt: DataTypes.DATE
})

module.exports = User
