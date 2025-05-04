"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersector_1 = require("../controllers/usersector");
const router = (0, express_1.Router)();
router.get("/", usersector_1.getUsersSector);
router.get("/:id", usersector_1.getuUserSectorPertence);
router.get("/sector/:id", usersector_1.getSectorContieneUser);
router.post("/", usersector_1.postuserCreateConSuSector);
router.post("/AgregarSectorUser/:id", usersector_1.postAsignarOtroSector);
router.put("/:id", usersector_1.actualizarSectorAlUser);
router.delete("/:id", usersector_1.deleteUserSector);
exports.default = router;
//# sourceMappingURL=usersector.js.map