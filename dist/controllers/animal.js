"use strict";
//PAra mañana creremos una clse que contenga todos las funcione  getnimales, getanimal, postanimal updateanimal gdelete animal
//igual  se creará el archivo animal.ts para la rutas  del os animales.
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
const reba_o_1 = __importDefault(require("../models/reba\u00F1o"));
const finca_1 = __importDefault(require("../models/finca"));
const usuario_1 = __importDefault(require("../models/usuario"));
class animalesControllers {
    constructor() {
        this.getAnimales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const animales = yield reba_o_1.default.findAll({
                    include: { model: usuario_1.default, as: "Usuario", where: { estado: true } },
                    where: { estado: true }, //?esta condicon es para que no aparezcan los animales eliminados
                });
                if (animales.length === 0) {
                    res.status(404).json({
                        msg: "No hay animales    en  la finca; ya que el usuario no esta activo o no existe, en la base de datos  ",
                        animales,
                    });
                    return;
                }
                res.json({
                    msg: "Este es getAnimales   de un usuario de la finca",
                    animales,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador ok",
                    error,
                });
            }
        });
        this.getAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //este el id del animal que se quiere mostrar
            try {
                const animal = yield reba_o_1.default.findOne({
                    where: { id: id },
                    include: { model: usuario_1.default, as: "Usuario", where: { estado: true } },
                });
                if (!animal) {
                    res.status(404).json({
                        msg: `No hay animal  con el id: ${id}   en  la finca; o el usuario no esta activo o no existe, en la base de datos`,
                        animal,
                    });
                    return;
                }
                res.json({
                    msg: "Este es el getAnimal para mostrar un semental de un usuario de la finca",
                    id, //es el id del animla que se quiere mostrar
                    animal,
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
        this.postAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const animal = reba_o_1.default.build(body);
                yield animal.save();
                res.json({
                    msg: " Es el postAnimal para cargar un animal en la base de datos  de un usuario de la finca",
                    animal, //este es el animal que se guardo en la base de datos
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        this.UpdateAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //es el id del animla que se quiere actualizar
            const { body } = req;
            try {
                const animal = yield reba_o_1.default.findOne({
                    where: { id: id, estado: true },
                    include: { model: usuario_1.default, as: "Usuario", where: { estado: true } },
                });
                if (!animal) {
                    res.status(404).json({
                        msg: `No hay animal con el id: ${id} en la base de datos o el usuario no esta activo `,
                    });
                    return;
                }
                yield animal.update(body);
                res.json({
                    msg: `Es el Update del animal: ${id}, que  se actualizaron`,
                    id,
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
        this.deleteAnimal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //es el adi del animal que se quiere eliminar
            try {
                const animal = yield reba_o_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                    include: { model: usuario_1.default, as: "Usuario", where: { estado: true } },
                });
                if (!animal) {
                    res.status(404).json({
                        msg: `No hay animal con el id: ${id} en la base de datos o el Animal no esta activo `,
                    });
                    return;
                }
                yield animal.update({ estado: false });
                res.json({
                    msg: "Es el deleteAnimal  Eliminado ",
                    id,
                    animal,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador ",
                    error,
                });
            }
        });
        //creamos el controlador para ver los animales que esta finca en la finca
        //? para poder utilizarlo en las rutas
        //***   */
        this.getAnimalesEnlaFinca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //este es el id de la finca
            try {
                const finca = yield finca_1.default.findByPk(id);
                if (!finca) {
                    res.status(404).json({
                        msg: `No hay finca con el id: ${id} en la base de datos okey`,
                    });
                    return;
                }
                const animales = yield finca_1.default.findAll({
                    include: { model: reba_o_1.default, as: "Rebaño", where: { fincaId: id } },
                });
                res.json({
                    msg: "Este es getAnimalesEnlaFinca  de la finca, debe mostrar los animales de la finca",
                    id, //este es el id de la finca
                    animales,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        //***   */
        //mostremos los animales de un usuario en particular queestan en la finca
        this.getAnmalesdeunUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //este es el id del usuario
            try {
                const usuario = yield usuario_1.default.findByPk(id);
                if (!usuario) {
                    res.status(404).json({
                        msg: `No hay usuario con el id: ${id} en la base de datos por lo tanto no hay animales`,
                    });
                    return;
                }
                const animales = yield reba_o_1.default.findAll({
                    include: { model: usuario_1.default, as: "Usuario", where: { id: id } },
                });
                res.json({
                    msg: "Este es getAnimalesdeunUsuario   de un usuario de la finca",
                    id, //es el ad del usuario
                    animales, //mostramos el usuario y los animales que tiene
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador para saber el error",
                    error,
                });
            }
        });
    }
}
exports.default = animalesControllers;
//# sourceMappingURL=animal.js.map