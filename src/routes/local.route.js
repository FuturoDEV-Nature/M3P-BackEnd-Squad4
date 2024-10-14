const { Router } = require("express");
const { auth } = require("../middleware/auth");

const LocalController = require("../controllers/LocalController");
const localSchema = require("../schemas/localSchema");
const validarLocal = require("../middleware/validateLocal");


const localRoutes = new Router();

localRoutes.post(
  "/cadastrar-local",
  auth, validarLocal(localSchema),
  /*  
            #swagger.tags = ['Local da Natureza'],
            #swagger.parameters['body'] = {
                in: 'body',
                Description: 'Adiciona um novo local da natureza',
                schema: {
                  $name: "Nome do local",
                  $localidade: "Rua, complemento, bairro",  
                  desc_flora: "tem flores silvestres",
                  desc_fauna: "não tem cachorro do mato",
                  
            }
        }
    */
  LocalController.cadastrar
);

localRoutes.get("/", auth, LocalController.listar);

localRoutes.put(
  "/:local_id",
  auth,
  /*
             #swagger.tags = ['Local da Natureza'],
            #swagger.parameters['body'] = {
                in: 'body',
                description: 'Adiciona um novo local da natureza',
                schema: {
                  $nome: "Nome do local",
                  $localidade: "Rua, complemento, bairro",
                  $data_visita: "2024-04-20",  
                  desc_flora: "tem flores silvestres",
                  desc_fauna: "não tem cachorro do mato",
                  
            }
        }.
    */
  LocalController.atualizar
);

localRoutes.delete("/:local_id", auth, LocalController.deletar);

localRoutes.get("/:local_id/maps", auth, LocalController.mapear);

module.exports = localRoutes;
