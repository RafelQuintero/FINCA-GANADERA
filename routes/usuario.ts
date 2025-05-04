//Importemos  metodo Router  de espress
import { Router } from "express";
// import {
//   getUsuarios,
//   getUsuario,
//   postUsuario,
//   putUsuario,
//   deleteUsuario,
// } from "../controllers/usuarios";
// Sera sustituido por
import { usuariosControllers } from "../controllers";
//Instancimos
const usuarios = new usuariosControllers();
const routes = Router();

routes.get("/", usuarios.getUsuarios);
routes.get("/:id", usuarios.getUsuario);
routes.post("/", usuarios.postUsuario);
routes.put("/:id", usuarios.putUsuario);
routes.delete("/:id", usuarios.deleteUsuario);
export default routes;
