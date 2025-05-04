import { Router } from "express";
// import {
//   getFincas,
//   getFinca,
//   postFinca,
//   putFinca,
//   deleteFinca,
// } from "../controllers/finca";
//* sustituimos por
import { fincaControllers } from "../controllers";

const finca = new fincaControllers();

//?debemomos requeirr el Router

//uLTILICEMOS EN METODO Ruter

const routes = Router();

routes.get("/", finca.getFincas);
routes.get("/:id", finca.getFinca);
routes.post("/", finca.postFinca);
routes.put("/:id", finca.putFinca);
routes.delete("/:id", finca.deleteFinca);

//Definamos las rutas de lo que se haran los controllers en finca(s)

export default routes;

//ahora dbeo enlazar el router con el modelo del servidor
