"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
//llamemos esta funcion para configurar dotenv
dotenv_1.default.config();
// export const nombre = 'RAFAEL';
// console.log(nombre);
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map