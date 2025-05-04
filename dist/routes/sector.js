"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sector_1 = require("../controllers/sector");
const router = (0, express_1.Router)();
router.get("/", sector_1.getSectors);
router.get("/:id", sector_1.getSector);
router.post("/", sector_1.postCreandoSector);
exports.default = router;
//# sourceMappingURL=sector.js.map