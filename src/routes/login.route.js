const { Router } = require("express");
const LoginController = require("../controllers/LoginController");

const loginRoutes = new Router();

loginRoutes.post(
  "/",
  /*  
            #swagger.tags = ['Login'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Tela de login',
                schema: {
                  $email: "teste123@gmail.com",
                  $password: "teste123"
            }
        }
    */
  LoginController.login
);

module.exports = loginRoutes;
