const jwt = require('jsonwebtoken');
const Permission = require('../models/Permission');
const PermissionRole = require('../models/PermissionRole');

function hasPermission(permissions){
    return async (request, response, next) => {

         // Verificar se o cabeçalho de autorização está presente
         if (!request.headers.authorization) {
            return response.status(401).send({ message: "Token não fornecido" });
        }

        const token = request.headers.authorization
        // Verificar se o token está presente
        if (!token) {
            return response.status(401).send({ message: "Token não fornecido" });
        }

        // faz a desestruturação do token e verifica se o token é válido
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        request.payload = decoded; 

        try { 
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: request.payload.roles.map((role)=>role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions'}]
            })

            //  some => Se pelo menos 1 for True, retorna True
            const existPermission = roles.some((item) => {
                const hasPermission = item.permissions.some((p) => {
                    return permissions.includes(p.description)
                })
                return hasPermission
            })
    
            if(!existPermission){
                return response.status(401).send({message: "Você não tem autorização para este recurso."})
            }

            next()
        } catch (error) {
            console.log(error)
            return response.status(401).send({
                message: "Autenticação Falhou",
                cause: error.message})
        }
    }
}

module.exports = { hasPermission }