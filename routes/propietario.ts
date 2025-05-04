import { Router } from "express";
// sera sustituiudo por

// Sera sustituido por
import { propietariosControllers } from "../controllers";
//lo instanciamos
const propietarios = new propietariosControllers();
const routes = Router();

routes.get("/", propietarios.getPropietarios);
routes.get("/:id", propietarios.getPropietario);

routes.post("/", propietarios.postPropietario);
routes.put("/:id", propietarios.putPropietario);
routes.delete("/:id", propietarios.deletePropietario);
export default routes;
