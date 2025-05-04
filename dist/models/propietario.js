"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const finca_1 = __importDefault(require("./finca"));
const Propietario = connection_1.default.define("Proietario", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
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
exports.default = Propietario;
finca_1.default.hasMany(Propietario, {
    foreignKey: "fincaId", //Clave de la finca
    sourceKey: "id", //Es el id de la finca
});
Propietario.belongsTo(finca_1.default, {
    foreignKey: "fincaId", //Se asignara al proietario la clave de la finca a la cual  es dueño
    targetKey: "id", //Es el id de la finca
});
//Ahiar ejecutemos el comado para crear las tabals en la base de datos
// Finca.sync(); //Com el .sync() crea la tabla si no existe y si existe nos hace nada
// Propietario.sync();
//# sourceMappingURL=propietario.js.map