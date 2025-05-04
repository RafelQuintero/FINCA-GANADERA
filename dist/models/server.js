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
//* Imprtemos express para que no aparezcan errores
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
//*importemos el modulo path para manejar la ubicacion de los achivos que me da nodejs
const path_1 = __importDefault(require("path"));
//*Hacmos la sincronizacion utilizando la base de datos
//definimis un alisa de de la rurta usurios de le importacion de esa uta
// import fincaRouter from "../routes/finca";
// import usuarioRouter from "../routes/usuario";
// import propietarioRouter from "../routes/propietario";
//SE optimizo el codigo importando todas las rutas desde un solo archivo index.ts la cual se importa en la linea 31.
const finca_1 = __importDefault(require("./finca"));
const usuario_1 = __importDefault(require("./usuario"));
const propietario_1 = __importDefault(require("./propietario"));
const reba_o_1 = __importDefault(require("./reba\u00F1o"));
finca_1.default.sync(); //sincronizamos la tabla finca con la base de datos para que coincidad con el modelo creado en el proyecto
//Finca.sync({ force: true }); y luegro se le elimino el parametro para que no se elimine la tabla, ya constrida a correr de nuevo el programa
usuario_1.default.sync();
reba_o_1.default.sync(); //sincronizamos la tabla rebaño con la base de datos para que se cree
// se le agrgo el parametro({force:true}) para que la tabal ya creada se elimine y se vuelva a crear.
//Rebaño.sync({ force: true }); y luegro se le elimino el parametro para que no se elimine la tabla, ya constrida a correr de nuevo el programa
//Rebaño.sync({ alter: true }); sincronizamos la tabla rebaño con la base de datos para que coincidad con el modelo creado en el proyecto
propietario_1.default.sync();
//? Nota: La sincronizacion se debe hacer siempr en el archivo server para que
// ? se crean las tablas de lo contrario nose se crearan ,porque son varias relaciones
//Para maximaiar el programa creamos un index.ts  en la routrs y  imprtamos ese index.ts que contien todads las ruta
const routes_1 = require("../routes");
//! HAgamos la importacion para que se sincronice los modelos con la base de datos
class Server {
    constructor() {
        //Propiedad para la direccion de la url, es definir todas las rutas para mi aplicacion
        this.apiPaths = {
            fincas: "/api/fincas", //direccion 'donde se ejecutaran sus solicitudes.
            usuarios: "/api/usuarios", // la direccion  donde se haran las solicitudes.
            propietarios: "/api/propietarios/", //direccion ' donde se ejecutarn las solicitudes
            animales: "/api/animales", //
            //Nuevo agregado
            //direccionde la api res don de solicira el Sector que contien user
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        //Metodos iniiciale
        //llamemos el metodo para conectar con la base de datos
        this.bdconnection();
        //lLaemos al middelware
        this.middlewares();
        //*LLamamos al metodo routes() ,
        // * para definir mis rutas
        this.routes();
    }
    //?/Nos hce falta la  configuracion de la base de datos para conectarnos con esta eliminado temporalmente
    bdconnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Conectado con base de datos");
            }
            catch (error) {
                console.log({ error });
                return;
            }
        });
    }
    //definimos el middelware
    middlewares() {
        //CORS, permite solicitudes desde otros origines
        this.app.use((0, cors_1.default)());
        //LECTURA DEL BODY
        this.app.use(express_1.default.json());
        //CARPETA PÚBLICA
        // this.app.use(express.static("public")); //Tambien funciona
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    }
    //Definiremos un metods llamado routes para manejar las rutas
    routes() {
        this.app.use(this.apiPaths.fincas, routes_1.finca);
        this.app.use(this.apiPaths.usuarios, routes_1.usuario);
        this.app.use(this.apiPaths.propietarios, routes_1.propietario);
        this.app.use(this.apiPaths.animales, routes_1.animal);
        // Manejar rutas incorrectas y redirigir a 404.html
        this.app.get("*", (req, res) => {
            // res.sendFile("index.html", { root: "public" });//Tambien funciona
            res.sendFile(path_1.default.join(__dirname, "../public", "404.html"));
        });
    }
    //Costruimos el metodo listen() para levatar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: " + this.port);
        });
    }
}
//Notese que la clase Server esta de un azul oscuro palido eso significa que solo la estoy usando en este archivo, por lo que debo exportarlo para utizarlo en otro lugar.
exports.default = Server;
//# sourceMappingURL=server.js.map