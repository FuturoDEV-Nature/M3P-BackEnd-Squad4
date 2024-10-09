const jwt = require('jsonwebtoken');
const Permission = require('../models/Permission');
const PermissionRole = require('../models/PermissionRole');

function hasPermission(permissions) {
    return async (req, res, next) => {
        // Verifica se o cabeçalho de autorização está presente
        if (!req.headers.authorization) {
            return res.status(401).send({ message: "Token não fornecido" });
        }

        const token = req.headers.authorization.split(" ")[1]; // Extraia o token {Bearer <token>}
        // Verifica se o token existe		
        if (!token) {
            return res.status(401).send({ message: "Token não fornecido" });
        }

        // Faz a desestruturação do token e verifica se o token é válido 
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.payload = decoded;
        console.log(":::PAYLOAD:::");
        console.log(decoded);

        try {
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: req.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions' }]
            });

            //console.log(":::ROLES :::");
            //console.log(roles);

            // Mapeando os permissionIds e verificando se existe permissão
            const permissionIds = roles.map(role => role.dataValues.permissionId);
			console.log(permissionIds)

            const existPermission = roles.some((role) => {
                return role.permissions.some((p) => {
					
					console.log(":::PERMISSÕES:::",p.description)
                    return permissions.includes(p.description);
                });
            });

            console.log(":::EXISTE A PERMISSÃO:::");
            console.log(existPermission);

            if (!existPermission) {
                return res.status(403).send({ message: "Você não tem autorização para este recurso." });
            }

            next();
        } catch (error) {
            console.log(error);
            return res.status(401).send({
                message: "Autenticação Falhou",
                cause: error.message
            });
        }
    };
}

module.exports = { hasPermission };
