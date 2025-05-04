"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const finca_1 = __importDefault(require("./finca"));
const Usuario = connection_1.default.define("Usuario", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, 
//con el objeto de abajo, como tercer argumento,  estoy desactivado las dos  columnas que se  deben crear en la tabla  que son createAt y UpdateAt
{
    timestamps: false,
});
exports.default = Usuario;
//la relacion de las tablas(modelos) finca y unsuario
finca_1.default.hasMany(Usuario, {
    foreignKey: "fincaId", //clave externa  se llamara fincaId
    sourceKey: "id", //Es la clcave de la finca que corresposda
});
Usuario.belongsTo(finca_1.default, {
    foreignKey: "fincaId", //En la tabla Usuario se colocara una columna con la clave fincaid que es la clve foreignKey
    targetKey: "id", // es el id de la fina
});
// Finca.sync();
// Usuario.sync();
//# sourceMappingURL=usuario.js.map