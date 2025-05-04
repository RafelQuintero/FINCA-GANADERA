import dotenv from "dotenv";
import Server from "./models/server";

//llamemos esta funcion para configurar dotenv
dotenv.config();

// export const nombre = 'RAFAEL';

// console.log(nombre);

const server = new Server();

server.listen();
