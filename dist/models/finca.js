"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Finca = connection_1.default.define("Finca", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firsName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    municipio_estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: false,
});
exports.default = Finca;
//realizamos la relacion de que una finca (es la source) tien punchos propetario(target (destino o objetivo))
//Realizamos la relacio de la finca con el rbaño que contiene
//la relacion de las tablas(modelos) finca y unsuario
//!Nota: Para que se ejecute la sincronizacon debo decirle al
//# sourceMappingURL=finca.js.map