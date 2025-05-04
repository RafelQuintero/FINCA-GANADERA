import { Request, Response } from "express";
import Usuario from "../models/usuario";
import Finca from "../models/finca";

//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))

class usuariosControllers {
  public getUsuarios = async (req: Request, res: Response) => {
    try {
      const usuarios = await Usuario.findAll({
        include: { model: Finca, as: "Finca" },
        where: { estado: true },
      });
      if (usuarios.length === 0) {
        res.status(404).json({
          msg: "No hay Usuarios en la base de datos",
          usuarios,
        });
        return;
      }

      res.json({
        msg: "Es el GetUsuarios para mostrarlas todos los  Usuarios de las finca(s)",
        usuarios,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };

  public getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      //const usuario = await Usuario.findByPk(id); no se pude utilziar  y que no reconoce a where
      const usuario = await Usuario.findOne({
        where: {
          id: id,
          estado: true,
        },
      });

      if (!usuario) {
        res.status(404).json({
          msg: `No existe un usuario con el id ${id}, o  su estado  en la base de datos está en  false `,
        });
        return;
      }

      res.json({
        msg: "Este es getUsuario para mostrar un Usuario de un finca",
        id,
        usuario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };

  public postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const usuario = await Usuario.build(body);
      await usuario.save();
      res.json({
        msg: "Este el registro o creacion de un  Usuario con la finca que pertenece",
        body,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  public putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({
          msg: `No existe un usuario con el id ${id}`,
        });
        return;
      }
      await usuario.update(body);

      res.json({
        msg: "Se acatualizó el Usuario con la finca que pertenece",
        body,
        id,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */
  public deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const usuario = await Usuario.findOne({
        where: {
          id: id,
          estado: true,
        },
      });
      if (!usuario) {
        res.status(404).json({
          msg: `No existe un usuario con el id ${id}, o  su estado en la base de datos está en  false `,
        });
        return;
      }
      await usuario.update({ estado: false }); //cambio de estado de true a false sin necesidad demandarlo en el body

      res.json({
        msg: "Se Elimino el Usuario",
        id,
        usuario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
}
export default usuariosControllers;

// export const getUsuarios = (req: Request, res: Response) => {
//   res.json({
//     msg: "Es el GetUsuarios para mostrarlas todos los  Usuarios",
//   });
// };

// export const getUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Este es getUsuario para mostrar un Usuario",
//     id,
//   });
// };

// export const postUsuario = (req: Request, res: Response) => {
//   const { body } = req;
//   res.json({
//     msg: "Este el registro o creacion de un  Usuario",
//     body,
//   });
// };
// export const putUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;

//   res.json({
//     msg: "Se acatualizó el Usuario",
//     body,
//     id,
//   });
// };
// export const deleteUsuario = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Se Elimino el Usuario",
//     id,
//   });
// };
