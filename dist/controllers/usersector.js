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
exports.deleteUserSector = exports.actualizarSectorAlUser = exports.postAsignarOtroSector = exports.postuserCreateConSuSector = exports.getSectorContieneUser = exports.getuUserSectorPertence = exports.getUsersSector = void 0;
const usersector_1 = __importDefault(require("../models/usersector"));
const user_1 = __importDefault(require("../models/user"));
const sector_1 = __importDefault(require("../models/sector"));
//*Creamos un get de todos los UserSector
const getUsersSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarioSectorIncuido = yield usersector_1.default.findAll();
    try {
        res.json({
            usuarioSectorIncuido,
            msg: "Mostramos los UserSector",
        });
    }
    catch (error) {
        res.json({
            msg: "Vea el error en visualEstudioCode",
        });
        console.log({ error });
    }
});
exports.getUsersSector = getUsersSector;
//*Crearmos un get UsuarioSectorPermenece
const getuUserSectorPertence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //?Agregar la comprobacon si el user con el id que se envia por medio de los paramtros de la url esta en en la registraod en la tabla user
        const usuarioSectorPer = yield user_1.default.findByPk(id, {
            include: {
                model: sector_1.default,
                through: { attributes: [] }, //*se excluyen los atributos de la tabla intermedia que es el modelo UserSector
            },
        });
        if (!usuarioSectorPer) {
            res.status(404).json({
                msg: `El usuario registrado ${id} no ubicado en  un sector`,
            });
            return;
        }
        res.json({
            usuarioSectorPer,
            msg: "User  con su(s) Sector(s)",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "error en eL server ",
            error,
        });
        console.log({ error });
    }
});
exports.getuUserSectorPertence = getuUserSectorPertence;
//*fin de lo anteriror getUsuarioSectorPertenece
//* Creamos un get del  Sector que contiene todos los user y lo llamaremos getSectorUserPertenece
const getSectorContieneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; //? Coresponde al id,como identificador  del Sector
        const sectorQuePertencceUser = yield sector_1.default.findByPk(id, {
            include: {
                model: user_1.default,
                through: { attributes: [] }, //? Se esta excluyendo todos los atributos de la tabla relcional llamada UserUector
            },
        });
        if (!sectorQuePertencceUser) {
            res.status(404).json({
                msg: `El Sector solicitado  con el id: ${id} no existe`,
            });
            return;
        }
        res.json({
            sectorQuePertencceUser,
            msg: "Sector con lo usurios que contiene",
        });
        //?
    }
    catch (error) {
        res.status(500).json({
            msg: "Hubo un error en algna parte del servido, se mostrarar el error",
            error,
        });
        console.log({ "El error es:": { error } });
    }
});
exports.getSectorContieneUser = getSectorContieneUser;
//*<fin del getSectorUserPertenece
///*Cearemos un post para crear un user y que este se  asign a un  Sector
const postuserCreateConSuSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req; //!Aqui el body me manda un objeto con el "nombreUser" :body.nombreser y el "nombreSector": body.nombreSector que quiero registar
    try {
        const buscandouser = yield user_1.default.findOne({
            //?busco el usuario que estoy ingresando en la base de datos  , si exite mando una advertencia
            //? Si no exite  se hace el nuevo ingreso.
            where: {
                nombreUser: body.nombreUser,
            },
        });
        //? Chequeamos ese usuario si el estado esta en false
        if (buscandouser) {
            res.status(404).json({
                msg: `El User con el nombre : ${body.nombreUser} ya esta registrado`,
            });
            return;
        }
        //* Como no esiste usuario le hago el ingreso.
        const userCreado = user_1.default.build({ nombreUser: body.nombreUser });
        yield userCreado.save();
        //*Ahora buscamos el id del ususriocreado utilizando el método get de sequeilze
        const idUserCrado = userCreado === null || userCreado === void 0 ? void 0 : userCreado.get("id");
        //*Busquemos el sector si existe o no existe lo creamos
        let existeSector = yield sector_1.default.findOne({
            where: {
                nombreSector: body.nombreSector,
            },
        });
        if (!existeSector) {
            existeSector = sector_1.default.build({ nombreSector: body.nombreSector }); //? Como ese sector bucado no existe lo creamos y lo guardamos
        }
        yield existeSector.save();
        //* Ahora proceremos a obtener id del sector creado  o que ya existia utilizando el metodo: get('id'),  de sequeize.
        const idexisteSector = existeSector.get("id");
        //todo: Ahora Asignemos  el User nuevo (userCreado) al sector que le corresponde. proe medio de la tabla UserSector
        const userSector = usersector_1.default.build({
            UserId: idUserCrado,
            SectorId: idexisteSector,
        });
        //*Guardemos el registro en la tabla UserSector
        yield userSector.save();
        //*si todo sale bien  debemos dar una repuesta
        res.json({
            userCreado,
            idUserCrado,
            existeSector,
            userSector,
            msg: " User registrado con su UserId  y Sector registrado con su SectorId ",
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({
            msg: "Ocurrio un enrros",
        });
        return;
    }
});
exports.postuserCreateConSuSector = postuserCreateConSuSector;
//*FIXME:*Crearemos un post para asigmarle otro Sector a un User
const postAsignarOtroSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //? Aqui se recibe el id del user al que se le quiere asignar otro sector
    const { body } = req; // Aqui el body me manda un objeto con el
    //   "nombreUser" :body.nombreser  al que se le quiere asignar otro sector "nombreSector": body.nombreSector donde se registrar.
    try {
        //?Buscamos el User que se quiere asignar otro sector
        const userAsignarSector = yield user_1.default.findOne({
            where: {
                //?Buscamos el user por su id enviado en los parametros de la url
                id: id,
            },
        });
        if (!userAsignarSector) {
            res.status(400).json({
                msg: `El User con el id: ${id} no existe`,
            });
            return;
        }
        //?Buscamos el sector que se quiere asignar al user
        const sectorAsignar = yield sector_1.default.findOne({
            where: {
                nombreSector: body.nombreSector, //?Buscamos el sector por su nombre enviado en el body
            },
        });
        if (!sectorAsignar) {
            res.status(400).json({
                msg: `El Sector con el nombre: ${body.nombreSector} no existe. Ingrese uno que este en la base de datos`,
            });
            return;
        }
        //?Ahora obtenemos el id del sector que se quiere asignar por medio del metos get de sequelize
        const idExisteSector = sectorAsignar.get("id");
        //?Ahora buscamos si el user ya tiene asignado el sector que se quiere asignar
        const userYaExisteSector = yield usersector_1.default.findOne({
            where: {
                UserId: id,
                SectorId: idExisteSector,
            },
        });
        if (userYaExisteSector) {
            res.status(404).json({
                msg: `El User con el id: ${id} ya tiene asignado el sector con el nombre: ${body.nombreSector}`,
            });
            return;
        }
        //?Ahora asignamos el sector al user utilizando la tabla relacional UserSector
        const userSector = usersector_1.default.build({
            UserId: id,
            SectorId: idExisteSector,
        });
        yield userSector.save();
        res.json({
            userAsignarSector,
            sectorAsignar,
            userSector,
            msg: "User asignado a otro Sector",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error en el Servidor, ver error",
            error,
        });
    }
});
exports.postAsignarOtroSector = postAsignarOtroSector;
//*FIXME: *Fin del post de asignarle otro sector a un user
//!!?FIXME:Creareemos un put para cambiar el sector de un user ;es decir cambiarle de sector.
//* Aqui proceremos a realizalr la actulizacion para cambir el sector de un user
const actualizarSectorAlUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //?Aqui se recibe el id del user al que se le quiere cambiar de sector
    //?Buscamos el user por su id
    try {
        // const body = req;
        const user = yield user_1.default.findByPk(id);
        const nuevosector = req.body.nombreSector; //*?req.body.nombreSector; de esta forma tambien se puede hacer
        if (!user) {
            res.status(404).json({
                msg: `El User con el id: ${id} no existe`,
            });
            return;
        }
        if (!nuevosector) {
            res.status(404).json({
                msg: `El Sector con el nombre: ${nuevosector} no existe`,
            });
            return;
        }
        //Obtengamos el id sel sector que se quiere asignar
        //? FIXME: la insrucion de abajo no esta funcionando, no captura el id del sector que se quiere asignar
        const sector = yield sector_1.default.findOne({
            where: {
                nombreSector: nuevosector,
            },
        });
        const idSector = sector === null || sector === void 0 ? void 0 : sector.get("id"); //*FIXME: Aqui se obtiene el id del sector que se quiere asignar:
        //*Utiliza el operador de encadenamiento opcional (?.)
        //* para asegurarse de que sector no sea null o undefined
        // * antes de intentar obtener el campo id. Si sector es null o undefined, idSector será undefined.
        //*FIXME: Otra manera de obtener el id del sector que se quiere asignar es la siguiente:
        // let idSector;
        // if (sector !== null && sector !== undefined) {
        //   idSector = sector.get("id");
        // }
        //!FIXME: Actualizacion del sector al user
        const actulzarSector = yield usersector_1.default.update({ SectorId: idSector }, {
            where: {
                UserId: id,
            },
        });
        //*Mandemos a mostar el user con el nuevo sector asignado
        const userConNevoSector = yield user_1.default.findByPk(id, {
            include: {
                model: sector_1.default,
                through: { attributes: [] }, //*se excluyen los atributos de la tabla intermedia que es el modelo UserSector
            },
        });
        res.json({
            userConNevoSector,
            message: "Aqui se mostrara el  Usuario con el nuevo sector asignado",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error en el servidor, ver error",
            error,
        });
        console.log({ error });
        return;
    }
});
exports.actualizarSectorAlUser = actualizarSectorAlUser;
//!FIXME:Fin del put de actualizacion dek sector par el usuario
//?FIXME: Crearemos un delete para eliminar un user de un sector
const deleteUserSector = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //?Aqui se recibe el id del user al que se le quiere eliminar de la base de datos y de su sector
    try {
        //?Buscamos el user por su id
        const user = yield user_1.default.findByPk(id);
        //Buscamos el user en la tabla de base de datos y chequear si esta activo o no
        if (!user || user.get("estado") === false) {
            res.status(404).json({
                msg: `El User con el id: ${id} no existe o no estaen la base de datos`,
            });
            return;
        }
        //?Eliminamos el user de la tabla UserSector
        const deleteUserSector = yield usersector_1.default.destroy({
            where: {
                UserId: id,
            },
        });
        //Cambiamos el estado del user a false para que no aparaezca en la tabla User cundos se haga un get de todos los user
        const deleteuser = yield user_1.default.update({ estado: false }, { where: { id: id } });
        //mostremos el user con el sector eliminado
        res.json({
            user,
            deleteUserSector,
            deleteuser,
            message: "User eliminado de la tabla UserSector",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error en el servidor, ver error",
            error,
        });
        console.log({ error });
    }
});
exports.deleteUserSector = deleteUserSector;
//?Agregando para ver si funciona
//?Fin de lo aggreado
//# sourceMappingURL=usersector.js.map