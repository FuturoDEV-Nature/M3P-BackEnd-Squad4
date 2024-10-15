const { config } = require('dotenv')						
config()

module.exports = {
  dialect: process.env.DIALECT, //Qual banco de dados está utilizando;
  host: process.env.HOST, //Qual servidor está utilizando;
  username: process.env.USERNAMEDB, //Qual o nome do seu usuário no postgres;
  password: process.env.PASSWORDDB, //Qual a password do seu usuário no postgres;
  database: process.env.DATABASE, //Qual o nome do seu database no postgres;
  port: process.env.PORT, //Qual porta do seu postgres (Normalmente é a 5432);
  dialectOptions: {
	// ssl: {
	// 	rejectUnauthorized: false,
	// 	require: true
	// }
  },	
  pool: {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000 // idle timeout  in miliseconds
  }
};