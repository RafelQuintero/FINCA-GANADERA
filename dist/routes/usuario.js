"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importemos  metodo Router  de espress
const express_1 = require("express");
// import {
//   getUsuarios,
//   getUsuario,
//   postUsuario,
//   putUsuario,
//   deleteUsuario,
// } from "../controllers/usuarios";
// Sera sustituido por
const controllers_1 = require("../controllers");
//Instancimos
const usuarios = new controllers_1.usuariosControllers();
const routes = (0, express_1.Router)();
routes.get("/", usuarios.getUsuarios);
routes.get("/:id", usuarios.getUsuario);
routes.post("/", usuarios.postUsuario);
routes.put("/:id", usuarios.putUsuario);
routes.delete("/:id", usuarios.deleteUsuario);
exports.default = routes;
//# sourceMappingURL=usuario.js.map