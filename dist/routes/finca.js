"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import {
//   getFincas,
//   getFinca,
//   postFinca,
//   putFinca,
//   deleteFinca,
// } from "../controllers/finca";
//* sustituimos por
const controllers_1 = require("../controllers");
const finca = new controllers_1.fincaControllers();
//?debemomos requeirr el Router
//uLTILICEMOS EN METODO Ruter
const routes = (0, express_1.Router)();
routes.get("/", finca.getFincas);
routes.get("/:id", finca.getFinca);
routes.post("/", finca.postFinca);
routes.put("/:id", finca.putFinca);
routes.delete("/:id", finca.deleteFinca);
//Definamos las rutas de lo que se haran los controllers en finca(s)
exports.default = routes;
//ahora dbeo enlazar el router con el modelo del servidor
//# sourceMappingURL=finca.js.map