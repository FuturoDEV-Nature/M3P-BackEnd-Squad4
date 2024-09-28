const { DataTypes } = require("sequelize")
const {connection} = require("../database/connection")
const Role = require("./Role")
const PermissionRole = require("./PermissionRole")

const Permission = connection.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

Role.belongsToMany(Permission, {through: PermissionRole})
Permission.belongsToMany(Role, {through: PermissionRole})
PermissionRole.hasMany(Permission, {foreignKey: 'id'})

module.exports = Permission