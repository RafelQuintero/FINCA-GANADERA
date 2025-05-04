"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DepartamentosFinca = connection_1.default.define('Departamento', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    deparatamento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    jefeDelDepartamento: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: false,
});
exports.default = DepartamentosFinca;
//# sourceMappingURL=usuariodepatamento.js.map