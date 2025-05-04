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
exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: { estado: true },
    });
    if (!users) {
        res.status(400).json({
            msg: "No hay Users regitrados ",
        });
        return;
    }
    res.json({
        users,
        msg: "Todos los User getUsers",
    });
    console.log(users.every((user) => user instanceof user_1.default)); // imprime true si todos las instancias son del modelo User.Asegurando que el resultados devueltos sean del tipo User
    console.log("All users:", JSON.stringify(users, null, 2)); //Imprime todo los users en formato json con una separacion de 2 espacio par que sea lejible, y conviere  el array  de users en una cadena
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existeUser = yield user_1.default.findOne({
        where: {
            id: id,
        },
    });
    if (!existeUser) {
        res.status(400).json({
            msg: `El user con el id ${id},  no esta  en la base de datos`,
        });
        return;
    }
    res.json({
        existeUser,
        msg: "getexisteUser",
        id,
    });
});
exports.getUser = getUser;
// //!Obtener todos los usuarios desactivados
// //! Fin de Obtener todos los usuarios desactivados
//*********************** */
//*************************** */
//# sourceMappingURL=user.js.map