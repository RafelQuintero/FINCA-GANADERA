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
const usuario_1 = __importDefault(require("../models/usuario"));
const finca_1 = __importDefault(require("../models/finca"));
//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))
class usuariosControllers {
    constructor() {
        this.getUsuarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuario_1.default.findAll({
                    include: { model: finca_1.default, as: "Finca" },
                    where: { estado: true },
                });
                if (usuarios.length === 0) {
                    res.status(404).json({
                        msg: "No hay Usuarios en la base de datos",
                        usuarios,
                    });
                    return;
                }
                res.json({
                    msg: "Es el GetUsuarios para mostrarlas todos los  Usuarios de las finca(s)",
                    usuarios,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        this.getUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                //const usuario = await Usuario.findByPk(id); no se pude utilziar  y que no reconoce a where
                const usuario = yield usuario_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                });
                if (!usuario) {
                    res.status(404).json({
                        msg: `No existe un usuario con el id ${id}, o  su estado  en la base de datos está en  false `,
                    });
                    return;
                }
                res.json({
                    msg: "Este es getUsuario para mostrar un Usuario de un finca",
                    id,
                    usuario,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
        });
        this.postUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const usuario = yield usuario_1.default.build(body);
                yield usuario.save();
                res.json({
                    msg: "Este el registro o creacion de un  Usuario con la finca que pertenece",
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
        this.putUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const usuario = yield usuario_1.default.findByPk(id);
                if (!usuario) {
                    res.status(404).json({
                        msg: `No existe un usuario con el id ${id}`,
                    });
                    return;
                }
                yield usuario.update(body);
                res.json({
                    msg: "Se acatualizó el Usuario con la finca que pertenece",
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
        //*** */
        this.deleteUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const usuario = yield usuario_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                });
                if (!usuario) {
                    res.status(404).json({
                        msg: `No existe un usuario con el id ${id}, o  su estado en la base de datos está en  false `,
                    });
                    return;
                }
                yield usuario.update({ estado: false }); //cambio de estado de true a false sin necesidad demandarlo en el body
                res.json({
                    msg: "Se Elimino el Usuario",
                    id,
                    usuario,
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
exports.default = usuariosControllers;
// export const getUsuarios = (req: Request, res: Response) => {
//   res.json({
//     msg: "Es el GetUsuarios para mostrarlas todos los  Usuarios",
//   });
// };
// export const getUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Este es getUsuario para mostrar un Usuario",
//     id,
//   });
// };
// export const postUsuario = (req: Request, res: Response) => {
//   const { body } = req;
//   res.json({
//     msg: "Este el registro o creacion de un  Usuario",
//     body,
//   });
// };
// export const putUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;
//   res.json({
//     msg: "Se acatualizó el Usuario",
//     body,
//     id,
//   });
// };
// export const deleteUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Se Elimino el Usuario",
//     id,
//   });
// };
//# sourceMappingURL=usuarios.js.map