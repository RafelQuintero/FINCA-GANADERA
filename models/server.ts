//* Imprtemos express para que no aparezcan errores
import express, { Application } from "express";
import { Request, Response } from "express";

import cors from "cors";
import db from "../db/connection";
//*importemos el modulo path para manejar la ubicacion de los achivos que me da nodejs
import path from "path";

//*Hacmos la sincronizacion utilizando la base de datos

//definimis un alisa de de la rurta usurios de le importacion de esa uta
// import fincaRouter from "../routes/finca";
// import usuarioRouter from "../routes/usuario";
// import propietarioRouter from "../routes/propietario";
//SE optimizo el codigo importando todas las rutas desde un solo archivo index.ts la cual se importa en la linea 31.
import Finca from "./finca";
import Usuario from "./usuario";
import Propietario from "./propietario";
import Rebaño from "./rebaño";
Finca.sync(); //sincronizamos la tabla finca con la base de datos para que coincidad con el modelo creado en el proyecto
//Finca.sync({ force: true }); y luegro se le elimino el parametro para que no se elimine la tabla, ya constrida a correr de nuevo el programa
Usuario.sync();

Rebaño.sync(); //sincronizamos la tabla rebaño con la base de datos para que se cree
// se le agrgo el parametro({force:true}) para que la tabal ya creada se elimine y se vuelva a crear.
//Rebaño.sync({ force: true }); y luegro se le elimino el parametro para que no se elimine la tabla, ya constrida a correr de nuevo el programa
//Rebaño.sync({ alter: true }); sincronizamos la tabla rebaño con la base de datos para que coincidad con el modelo creado en el proyecto
Propietario.sync();

//? Nota: La sincronizacion se debe hacer siempr en el archivo server para que
// ? se crean las tablas de lo contrario nose se crearan ,porque son varias relaciones

//Para maximaiar el programa creamos un index.ts  en la routrs y  imprtamos ese index.ts que contien todads las ruta

import { finca, usuario, propietario, animal } from "../routes";

//! HAgamos la importacion para que se sincronice los modelos con la base de datos

class Server {
  //propiedad   del constructor que va a tener las ase server

  private app: Application; // propiedad para definir la app que es del tipo express.Aplication
  private port: string; //propiedad para definir  el puerto y que sea del tipo strin , puede ser del tipo nomérioco
  //Propiedad para la direccion de la url, es definir todas las rutas para mi aplicacion
  private apiPaths = {
    fincas: "/api/fincas", //direccion 'donde se ejecutaran sus solicitudes.
    usuarios: "/api/usuarios", // la direccion  donde se haran las solicitudes.
    propietarios: "/api/propietarios/", //direccion ' donde se ejecutarn las solicitudes
    animales: "/api/animales", //

    //Nuevo agregado
    //direccionde la api res don de solicira el Sector que contien user
  };

  constructor() {
    this.app = express();
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
  async bdconnection() {
    try {
      await db.authenticate();
      console.log("Conectado con base de datos");
    } catch (error) {
      console.log({ error });
      return;
    }
  }

  //definimos el middelware
  middlewares() {
    //CORS, permite solicitudes desde otros origines
    this.app.use(cors());
    //LECTURA DEL BODY
    this.app.use(express.json());

    //CARPETA PÚBLICA
    // this.app.use(express.static("public")); //Tambien funciona
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  //Definiremos un metods llamado routes para manejar las rutas
  routes() {
    this.app.use(this.apiPaths.fincas, finca);
    this.app.use(this.apiPaths.usuarios, usuario);
    this.app.use(this.apiPaths.propietarios, propietario);
    this.app.use(this.apiPaths.animales, animal);

    // Manejar rutas incorrectas y redirigir a 404.html
    this.app.get("*", (req: Request, res: Response) => {
      // res.sendFile("index.html", { root: "public" });//Tambien funciona
      res.sendFile(path.join(__dirname, "../public", "404.html"));
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
export default Server;
