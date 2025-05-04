//? Se  obtiene  el  archivo animalcontrollers del archivo index que lo contiene y  que está el la capeta controllers
import { animalesControllers } from "../controllers";

//?Extraemos el metod Ruter ta poder utilizarlo a crear las rutas.
import { Router } from "express";

const router = Router();

//creamos una instancia para puder tilizar la clasegetAnimales

const rebaño = new animalesControllers();

// Get all animals
router.get("/", rebaño.getAnimales);

//Ger one animal
router.get("/:id", rebaño.getAnimal);

// Create a new animal
router.post("/", rebaño.postAnimal);

// Update an animal
router.put("/:id", rebaño.UpdateAnimal);

// Delete an animal
router.delete("/:id", rebaño.deleteAnimal);

//Mostramos de los animales de una finca en particular
router.get("/finca/:id", rebaño.getAnimalesEnlaFinca);

router.get("/usuario/:id", rebaño.getAnmalesdeunUsuario);

export default router;
