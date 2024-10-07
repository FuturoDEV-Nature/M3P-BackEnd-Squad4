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
		//console.log(decoded)

		try {
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: req.payload.roles.map((role)=>role.id)	// BUG!!!
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions' }]
            });
			console.log(roles)
            const existPermission = roles.some((item) => {
                const hasPermission = item.permissions.some((p) => {
                    return permissions.includes(p.description);
                });
                return hasPermission;
            });

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
