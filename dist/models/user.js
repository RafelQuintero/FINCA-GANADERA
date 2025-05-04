"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
//definamos la tablae User
const User = connection_1.default.define("Users", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    timestamps: false,
});
exports.default = User;
//# sourceMappingURL=user.js.map