const { DataTypes } = require("sequelize")
const {connection} = require("../database/connection")
const Role = require("./Role")
const PermissionRole = require("./PermissionRole")
const User = require("./User")
const UserRole = require("./UserRole")

const Permission = connection.define('permissions', {
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


User.belongsToMany(Role, {through: UserRole})
Role.belongsToMany(User, {through: UserRole})


module.exports = Permission