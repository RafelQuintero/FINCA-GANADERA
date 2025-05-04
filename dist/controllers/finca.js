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
const finca_1 = __importDefault(require("../models/finca"));
//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))
class fincaControllers {
    constructor() {
        this.getFincas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const datafincas = yield finca_1.default.findAll({
                    where: { estado: true },
                });
                if (!datafincas) {
                    res.status(404).json({
                        msg: `No existen fincas registradas en la base de datos`,
                    });
                    return;
                }
                res.json({
                    msg: "Estas son las  fincas registradasen la base de datos",
                    datafincas,
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
        this.getFinca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                //* const finca = await Finca.findByPk(id); //*se modidico esta instruccion
                // * ya que solo acepta un solo parametro
                const datafinca = yield finca_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                });
                if (!datafinca) {
                    res.status(404).json({
                        msg: `No existe una finca con el id ${id}`,
                    });
                    return;
                }
                res.json({
                    msg: `Este es getFinca para mostrar la finca solicictas : ${id} `,
                    datafinca,
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
        this.postFinca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log("Datos recibidos de cliente", body);
            try {
                const finca = finca_1.default.build(body);
                yield finca.save();
                res.json({
                    msg: "Este el registro de un finca PostFinca",
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
        //*** */
        this.putFinca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            console.log("Datos recibidos, actualizacion-finca: " + id, body);
            try {
                const finca = yield finca_1.default.findByPk(id);
                if (!finca) {
                    res.status(404).json({
                        msg: `No existe una finca con el id ${id}`,
                    });
                    return;
                }
                yield finca.update(body);
                res.json({
                    msg: " Se Actualizo la finca: " + id,
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
        this.deleteFinca = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const finca = yield finca_1.default.findOne({
                    where: {
                        id: id,
                        estado: true,
                    },
                });
                if (!finca) {
                    res.status(404).json({
                        msg: "No existe una Finca con el id " +
                            id +
                            " o ya fue eliminado(false) en la base de datos ",
                    });
                    return;
                }
                yield finca.update({ estado: false });
                res.json({
                    msg: "Se Elimino la Finca",
                    id,
                    finca,
                });
            }
            catch (error) {
                res.status(500).json({
                    msg: "Hable con el administrador",
                    error,
                });
            }
            // const { id } = req.params;
            // res.json({
            //   msg: "Se Elimino el finca",
            //   id,
            // });
        });
    }
}
exports.default = fincaControllers;
// las linas de codigo comentadas son para probar que el controlador y las rutas esten funcionando bien
// y fueron sustituidas por la clase fincaControllers aapar obtimizar el codigo
// export const getFincas = (req: Request, res: Response) => {
//   res.json({
//     msg: "Eta el GetFncas para mostrarlas todas la fincas",
//   });
// };
// export const getFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Este es getFinca para mostrar un finca",
//     id,
//   });
// };
// export const postFinca = (req: Request, res: Response) => {
//   const { body } = req;
//   res.json({
//     msg: "Este el registro de un finca PostFinca",
//     body,
//   });
// };
// export const putFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;
//   res.json({
//     msg: "Se acatualizó la finca",
//     body,
//     id,
//   });
// };
// export const deleteFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Se Elimino el finca",
//     id,
//   });
// };
//# sourceMappingURL=finca.js.map