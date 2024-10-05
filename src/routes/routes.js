const { Router } = require("express");
const loginRoutes = require("./login.route");
const userRoutes = require("./user.route");
const localRoutes = require("./local.route");
const rbacRoutes = require("./rbac.route");
//const authRoutes = require("./auth.route")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc.swagger.json");

const routes = new Router();

routes.use("/login", loginRoutes);
routes.use("/user", userRoutes);
//routes.use("/login", authRoutes);
routes.use("/rbac", rbacRoutes);
routes.use("/local", localRoutes);
routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = routes;
