"use strict";
//nota como  no puedo hacer un index de esta manera ya que en cada unos de los archivos
//  no tengo un exportacion por defecto
//para solucionarlo es crear una clase en cada unos de los
//archivos de  la carpeta controllers para manejar cada na de las funcines
//Lo que se hace es lo siguiente:
//En cada uno de los archivo de controlles : finca , ususrios, propietario
//construimos una clase que contenga cada una de las funcione
//dde lo que se quiere hacer, y luego se hace una exportacion por defecto
//ejemplo:
//class fincaController{ //**  escribo aqui
// *funciones que hagan un
// * get post , put y delee}
//Luego hacemos una exportacion por defecto
// export  defaul fincaControllers
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalesControllers = exports.propietariosControllers = exports.usuariosControllers = exports.fincaControllers = void 0;
//esto es lo que engo que hacer mapar mañana
// para mejora e código
const finca_1 = __importDefault(require("./finca"));
exports.fincaControllers = finca_1.default;
const usuarios_1 = __importDefault(require("./usuarios"));
exports.usuariosControllers = usuarios_1.default;
const propietarios_1 = __importDefault(require("./propietarios"));
exports.propietariosControllers = propietarios_1.default;
const animal_1 = __importDefault(require("./animal"));
exports.animalesControllers = animal_1.default;
//# sourceMappingURL=index.js.map