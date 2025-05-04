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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({
        usuarios,
        msg: 'getUsuarios',
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existeEstado = yield usuario_1.default.findOne({
        where: {
            id: id,
            estado: 1,
        },
    });
    if (!existeEstado) {
        res.status(400).json({
            msg: `El usuario con el id ${id},  está desactivada en la base de datos`,
        });
        return;
    }
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json({
            usuario,
            msg: 'getUsuario',
            id,
        });
    }
    else {
        res.status(404).json({
            msg: `El usuario con el id: ${id} no exite`,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //No deben tener solo un  usuarios con un correo unico
        const exiteEmail = yield usuario_1.default.findOne({
            where: { email: body.email },
        });
        if (exiteEmail) {
            res.status(400).json({
                msg: 'Ya existe un email en el registro de usuario ' + body.email,
            });
            return;
        }
        const usuario = usuario_1.default.build(body);
        yield usuario.save();
        console.log({ usuario });
        res.json({ usuario });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable com el administrador',
        });
    }
    // 	res.json({
    // 		msg: 'postUsuario',
    // 		body,
    // 	});
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        //debe chequer si eses usuario existe con ese id
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            res.status(404).json({
                msg: `No existe un usurio con el id ${id}`,
            });
            return;
        }
        yield usuario.update(body);
        console.log({ usuario });
        res.json({
            usuario,
            msg: 'putUsuario',
            id,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'El usuario no se  actualizo hable con el administrador',
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existeUsuario = yield usuario_1.default.findByPk(id);
        if (!existeUsuario) {
            res.status(400).json({
                msg: `No exite un usuario con ese id: ${id}`,
            });
            return;
        }
        existeUsuario.set({
            estado: 0,
        });
        yield existeUsuario.save();
        res.json({
            existeUsuario,
            msg: 'deleteUsuario',
            id,
        });
    }
    catch (error) {
        console.log(error);
        res.status(599).json({
            mst: 'Hable con el administrador',
        });
    }
    // 	res.json({
    // 		msg: 'deleteUsuario',
    // 		id,
    // 	});
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.js.map