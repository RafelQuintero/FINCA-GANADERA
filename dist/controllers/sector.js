"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreandoSector = exports.getSector = exports.getSectors = void 0;
const sector_1 = __importDefault(require("../models/sector"));
const getSectors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sectors = yield sector_1.default.findAll();
    if (!sectors) {
        res.status(400).json({
            msg: "No hay Sectors regitrados ",
        });
        return;
    }
    res.json({
        sectors,
        msg: "getSectors",
    });
});
exports.getSectors = getSectors;
const getSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existeSector = yield sector_1.default.findOne({
        where: {
            id: id,
        },
    });
    if (!existeSector) {
        res.status(400).json({
            msg: `El user con el id ${id},  no esta  en la base de datos  OJOAQUIAPARECE`,
        });
        return;
    }
    res.json({
        existeSector,
        msg: "getexisteSector",
        id,
    });
});
exports.getSector = getSector;
const postCreandoSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombreSector } = req.body; //* Obtenemos el body de la peticion
    const existeSector = yield sector_1.default.findOne({
        where: {
            nombreSector: nombreSector,
        },
    });
    try {
        if (existeSector) {
            res.status(400).json({
                msg: `El sector ${existeSector} ya existe en la base de datos`,
            });
            //No dejo que el progra,a continue
            return;
        }
        const nuevosector = sector_1.default.build({ nombreSector });
        //Proecedemoa guardar el Sector en la base de datos
        yield nuevosector.save();
        res.json({
            nuevosector,
            msg: `El Sector ${nombreSector} fué creado con exito`,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error en el servidor y el error es:",
            error,
        });
        console.log({ error });
    }
});
exports.postCreandoSector = postCreandoSector;
//# sourceMappingURL=sector.js.map