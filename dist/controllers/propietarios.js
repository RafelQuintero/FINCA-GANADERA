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
const propietario_1 = __importDefault(require("../models/propietario"));
const finca_1 = __importDefault(require("../models/finca"));
//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))
//
class propíetariosControllers {
    constructor() {
        this.getPropietarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datapropietarios = yield propietario_1.default.findAll({
                    include: { model: finca_1.default, as: "Finca" },
                    where: { estado: true },
                });
                if (datapropietarios.length === 0) {
                    res.status(404).json({
                        msg: "No hay Propietarios en la base de datos",
                        datapropietarios,
                    });
                    return;
                }
                res.json({
                    msg: "Es el GetPropietario para mostrarlas todos los  Propietarios con su finca",
                    datapropietarios,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        //** */
        this.getPropietario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const datapropietario = yield propietario_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                    include: { model: finca_1.default, as: "Finca" },
                });
                if (!datapropietario) {
                    res.status(404).json({
                        msg: "No existe un Propietario con el id " + id,
                    });
                    return;
                }
                res.json({
                    msg: "Este es getUsuario para mostrar un Propietario con su finca",
                    id,
                    datapropietario,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        //*** */
        this.postPropietario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const propietario = propietario_1.default.build(body);
                yield propietario.save();
                res.json({
                    msg: "Este el registro o creacion de un  Propietario",
                    body,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        this.putPropietario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                // const propietario = await Propietario.findByPk(id);
                const propietario = yield propietario_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                    //include: { model: Finca, as: "Finca" },
                });
                if (!propietario) {
                    res.status(404).json({
                        msg: "No existe un Propietario con el id " +
                            id +
                            " o ya fue eliminado(false) en la base de datos ",
                    });
                    return;
                }
                yield propietario.update(body);
                res.json({
                    msg: "Se actualizó el Propieterio",
                    body,
                    id,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        this.deletePropietario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const propietario = yield propietario_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                });
                if (!propietario) {
                    res.status(404).json({
                        msg: "No existe un Propietario con el id " +
                            id +
                            " o ya fue eliminado(false) en la base de datos ",
                    });
                    return;
                }
                yield propietario.update({ estado: false });
                res.json({
                    msg: "Se Elimino el Propietario",
                    id,
                    propietario,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
    }
}
exports.default = propíetariosControllers;
//# sourceMappingURL=propietarios.js.map