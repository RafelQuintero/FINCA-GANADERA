"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//? Se  obtiene  el  archivo animalcontrollers del archivo index que lo contiene y  que está el la capeta controllers
const controllers_1 = require("../controllers");
//?Extraemos el metod Ruter ta poder utilizarlo a crear las rutas.
const express_1 = require("express");
const router = (0, express_1.Router)();
//creamos una instancia para puder tilizar la clasegetAnimales
const rebaño = new controllers_1.animalesControllers();
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
exports.default = router;
//# sourceMappingURL=animal.js.map