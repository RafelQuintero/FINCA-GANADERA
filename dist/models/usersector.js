"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const sector_1 = __importDefault(require("./sector"));
const user_1 = __importDefault(require("./user"));
//Creamos la tabla que releciona a las Tblas User y Sector
const UserSector = connection_1.default.define("UserSector", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    SectorId: {
        //! NO ACEPTA ESCRIBIR SectoreId, ES LA  SEGUNDA LETRA "E" NO LA RECONOCE CUANDO SE CONSTRUYE LA TABLA UserSetor   como clave de relacion: SectoreId.
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: sector_1.default,
            key: "id",
        },
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
}, {
    timestamps: false,
});
exports.default = UserSector;
//Como aqui ya teneoms importado  los dos modelos de la tabla que se van a relcionar, por medio del modelo de la tabla UserSector , hagamos aqui.
sector_1.default.belongsToMany(user_1.default, { through: "UserSector" });
user_1.default.belongsToMany(sector_1.default, { through: "UserSector" });
//! Cn la instruciones en las lineas 44 al 46  se crean en la base de datos las tablas UserSector, Sector y User, con las relaciones de muchos a muchos entre User y Sector, y UserSector.
sector_1.default.sync();
user_1.default.sync();
UserSector.sync();
//! las instruccione en las linesa 44 al 46 se ejcutan solo una vez, para crear las tablas en la base de datos.
//# sourceMappingURL=usersector.js.map