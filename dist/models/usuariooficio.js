"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuariofinca_1 = __importDefault(require("./usuariofinca"));
const usuariodepatamento_1 = __importDefault(require("./usuariodepatamento"));
// las tablas que relacion  Usuariofinca y la tabla usuariodepartamento es la tabla OficioUsuario y es aqui donde vamos  a realizar la relacion debemos importar estas dos tablas.
//+++
const OficioUsuario = connection_1.default.define('OficioUsuario', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: false,
});
exports.default = OficioUsuario;
//Como esta es la tabla intermedia que hace la relaoion de la tabla UsuarioFinca y  la tabal Departemento creada en el modelo UsuaDepartamento.
usuariofinca_1.default.belongsToMany(usuariodepatamento_1.default, {
    through: OficioUsuario, //DepartamentoFinca  se relaciona a traves del OficioUsuario
});
usuariodepatamento_1.default.belongsToMany(usuariofinca_1.default, {
    through: OficioUsuario,
});
//Con los lineas del 28 al 37  ya realizamos la relacion
//sincronicemos la tabals a bilculualar
usuariofinca_1.default.sync();
usuariodepatamento_1.default.sync();
//vinculemos ambas tablas
OficioUsuario.sync();
//# sourceMappingURL=usuariooficio.js.map