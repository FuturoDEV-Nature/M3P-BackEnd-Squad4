const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");
const User = require("./User");
//const { hash } = require("bcryptjs");

const Local = connection.define("local", {
  name: {
    type: DataTypes.STRING,
  },
  cep: {
	type: DataTypes.STRING
  },
  local_endereco: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      // This is a reference to another model
      model: User,
      // This is the column name of the referenced model
      key: "id",
    },
  },
});
User.hasMany(Local, {
  foreignKey: "userId",
});
Local.belongsTo(User);

module.exports = Local;
