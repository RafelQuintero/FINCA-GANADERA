"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// sera sustituiudo por
// Sera sustituido por
const controllers_1 = require("../controllers");
//lo instanciamos
const propietarios = new controllers_1.propietariosControllers();
const routes = (0, express_1.Router)();
routes.get("/", propietarios.getPropietarios);
routes.get("/:id", propietarios.getPropietario);
routes.post("/", propietarios.postPropietario);
routes.put("/:id", propietarios.putPropietario);
routes.delete("/:id", propietarios.deletePropietario);
exports.default = routes;
//# sourceMappingURL=propietario.js.map