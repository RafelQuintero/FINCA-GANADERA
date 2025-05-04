"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const finca_1 = __importDefault(require("./finca"));
const Rebaño = connection_1.default.define("Rebaño", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    serial_numeracion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    año_ingreso: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    vendido: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "NO",
    },
    año_vendido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "NO",
    },
    fallecio: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "NO",
    },
    año_fallecido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "NO",
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
exports.default = Rebaño;
//relaicemos la relacion de usurio rebaño
usuario_1.default.hasMany(Rebaño, {
    foreignKey: "usuarioId", //Es la clave externa que se le agreara a la tabla rebaño, creando ua columna llamada usuarioId
    sourceKey: "id", //es el id del ususrio que corresponda
});
Rebaño.belongsTo(usuario_1.default, {
    foreignKey: "usuarioId",
    targetKey: "id", //Este es el id de que sera asignado en la columna creada en la tabla rebaño con el nombre usuarioId
});
//*Segunda relacion de la tabla finca y rebaño
finca_1.default.hasOne(Rebaño, {
    foreignKey: "fincaId", //clave externa  se llamara fincaId la cual se le agregara a la tabla rebaño
    sourceKey: "id", //Es la clcave de la finca que corresposda
});
Rebaño.belongsTo(finca_1.default, {
    foreignKey: "fincaId", //En la tabla Rebaño se colocara una columna con la clave fincaid que es la clve foreignKey
    targetKey: "id", // es el id de la finca
});
// Usuario.sync();
// Rebaño.sync();
// Finca.sync();
//# sourceMappingURL=reba%C3%B1o.js.map