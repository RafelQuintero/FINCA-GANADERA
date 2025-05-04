import { Request, Response } from "express";
import Propietario from "../models/propietario";
import Finca from "../models/finca";
import { where } from "sequelize";

//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))

//

class propíetariosControllers {
  public getPropietarios = async (req: Request, res: Response) => {
    try {
      const datapropietarios = await Propietario.findAll({
        include: { model: Finca, as: "Finca" },
        where: { estado: true },
      });

      if (datapropietarios.length === 0) {
        res.status(404).json({
          msg: "No hay Propietarios en la base de datos",
          datapropietarios,
        });
        return;
      }

      res.json({
        msg: "Es el GetPropietario para mostrarlas todos los  Propietarios con su finca",
        datapropietarios,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //** */

  public getPropietario = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const datapropietario = await Propietario.findOne({
        where: {
          id: id,
          estado: true,
        },

        include: { model: Finca, as: "Finca" },
      });
      if (!datapropietario) {
        res.status(404).json({
          msg: "No existe un Propietario con el id " + id,
        });
        return;
      }

      res.json({
        msg: "Este es getUsuario para mostrar un Propietario con su finca",

        id,
        datapropietario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */
  public postPropietario = async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const propietario = Propietario.build(body);
      await propietario.save();

      res.json({
        msg: "Este el registro o creacion de un  Propietario",
        body,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  public putPropietario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
      // const propietario = await Propietario.findByPk(id);
      const propietario = await Propietario.findOne({
        where: {
          id: id,
          estado: true,
        },

        //include: { model: Finca, as: "Finca" },
      });
      if (!propietario) {
        res.status(404).json({
          msg:
            "No existe un Propietario con el id " +
            id +
            " o ya fue eliminado(false) en la base de datos ",
        });
        return;
      }
      await propietario.update(body);

      res.json({
        msg: "Se actualizó el Propieterio",
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
  public deletePropietario = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const propietario = await Propietario.findOne({
        where: {
          id: id,
          estado: true,
        },
      });
      if (!propietario) {
        res.status(404).json({
          msg:
            "No existe un Propietario con el id " +
            id +
            " o ya fue eliminado(false) en la base de datos ",
        });
        return;
      }
      await propietario.update({ estado: false });

      res.json({
        msg: "Se Elimino el Propietario",
        id,
        propietario,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
}
export default propíetariosControllers;
