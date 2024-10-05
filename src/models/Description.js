const { connection } = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Local = require("./Local");

const Action = connection.define("descriptions", {
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

  desc_fauna: {
    type: DataTypes.STRING,
  },

  desc_flora: {
    type: DataTypes.STRING,
  },
});

User.hasMany(Action, {
  foreignKey: "userId",
});
Action.belongsTo(User, {
  foreignKey: "userId",
});

Local.hasMany(Action, {
  foreignKey: "local_id",
});
Action.belongsTo(Local, {
  foreignKey: "local_id",
});

module.exports = Action;
