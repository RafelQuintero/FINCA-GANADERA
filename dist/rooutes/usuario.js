"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importemos  metodo Router  de espress
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
//copiemos el metodo Ruter()a una variable la cual esta será exportada por defecto
const router = (0, express_1.Router)();
//crearemos las rutas
router.get('/', usuario_1.geUsuarios);
router.get('/:id', usuario_1.geUsuario);
router.post('/', usuario_1.postUsuario);
router.put('/:id', usuario_1.putUsuario);
router.delete('/:id', usuario_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map