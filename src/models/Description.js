const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Local = require("./Local");

const Description = connection.define("descriptions", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },

  local_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Local,
      key: "id",
    },
  },

  data_visita: {
    type: DataTypes.DATE,
  },

  descricao: {
    type: DataTypes.TEXT,
  }
});

User.hasMany(Description, {
  foreignKey: "userId",
});
Description.belongsTo(User, {
  foreignKey: "userId",
});

Local.hasMany(Description, {
  foreignKey: "local_id",
});
Description.belongsTo(Local, {
  foreignKey: "local_id",
});

module.exports = Description;
