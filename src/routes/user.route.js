const { Router } = require("express");

const userController = require("../controllers/UserController");
const userSchema = require("../schemas/userSchema");
const validarUser = require("../middleware/validateUser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc.swagger.json");
const {hasPermission} = require("../middleware/hasPermission")
const router = new Router();


router.get("/", hasPermission(["ler_usuarios"]), userController.findAll);
router.get("/:id", hasPermission(["ler_usuarios"]), userController.findById);
router.post(
  "/", hasPermission(["criar_usuario"]),
  validarUser(userSchema),
  /*  
            #swagger.tags = ['Usuário'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo Usuário',
                schema: {
                  $nome: "Nome completo",
                  sexo: "feminino, masculino ou outros",
                  $cpf: "10987654321",  
                  $email: "teste@gmail.com",
                  $password: "123",
                  data_nascimento: "1996-12-15",
            }
        }
    */
  userController.createNewUser
);

router.put(
  "/:userId", hasPermission(["editar_usuario"]),
  /*
            #swagger.tags = ['Usuário],
            #swagger.parameters['userId'] = {
                in: 'body',
                schema: {
                    $nome: "Nome completo",
                    sexo: "feminino, masculino ou outros",
                    $cpf: "10987654321",  
                    $email: "teste@gmail.com",
                    $password: "123",
                    data_nascimento: "1996-12-15",
                }
            }
        */

  //  validarUser(userSchema),

  userController.updateUser
);

router.get("/", swaggerUi.setup(swaggerDocument));

//Rota para deletar conta ...
router.delete("/id", hasPermission(["remover_usuario"]), userController.deleteUser);

module.exports = router;
