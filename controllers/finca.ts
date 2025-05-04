import { Request, Response } from "express";
import Finca from "../models/finca";

//*1er. paso es cheguqer que todos los controladores y la rutas fucione bine))

class fincaControllers {
  public getFincas = async (req: Request, res: Response) => {
    try {
      const datafincas = await Finca.findAll({
        where: { estado: true },
      });

      if (!datafincas) {
        res.status(404).json({
          msg: `No existen fincas registradas en la base de datos`,
        });
        return;
      }

      res.json({
        msg: "Estas son las  fincas registradasen la base de datos",
        datafincas,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */

  public getFinca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      //* const finca = await Finca.findByPk(id); //*se modidico esta instruccion
      // * ya que solo acepta un solo parametro
      const datafinca = await Finca.findOne({
        where: {
          id: id,
          estado: true,
        },
      });
      if (!datafinca) {
        res.status(404).json({
          msg: `No existe una finca con el id ${id}`,
        });
        return;
      }

      res.json({
        msg: `Este es getFinca para mostrar la finca solicictas : ${id} `,

        datafinca,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */
  public postFinca = async (req: Request, res: Response) => {
    const { body } = req;
    console.log("Datos recibidos de cliente", body);
    try {
      const finca = Finca.build(body);
      await finca.save();

      res.json({
        msg: "Este el registro de un finca PostFinca",
        body,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */
  public putFinca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    console.log("Datos recibidos, actualizacion-finca: " + id, body);

    try {
      const finca = await Finca.findByPk(id);
      if (!finca) {
        res.status(404).json({
          msg: `No existe una finca con el id ${id}`,
        });
        return;
      }
      await finca.update(body);

      res.json({
        msg: " Se Actualizo la finca: " + id,
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
  public deleteFinca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const finca = await Finca.findOne({
        where: {
          id: id,
          estado: true,
        },
      });
      if (!finca) {
        res.status(404).json({
          msg:
            "No existe una Finca con el id " +
            id +
            " o ya fue eliminado(false) en la base de datos ",
        });
        return;
      }
      await finca.update({ estado: false });

      res.json({
        msg: "Se Elimino la Finca",
        id,
        finca,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }

    // const { id } = req.params;
    // res.json({
    //   msg: "Se Elimino el finca",
    //   id,
    // });
  };
}

export default fincaControllers;

// las linas de codigo comentadas son para probar que el controlador y las rutas esten funcionando bien
// y fueron sustituidas por la clase fincaControllers aapar obtimizar el codigo

// export const getFincas = (req: Request, res: Response) => {
//   res.json({
//     msg: "Eta el GetFncas para mostrarlas todas la fincas",
//   });
// };

// export const getFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Este es getFinca para mostrar un finca",
//     id,
//   });
// };

// export const postFinca = (req: Request, res: Response) => {
//   const { body } = req;
//   res.json({
//     msg: "Este el registro de un finca PostFinca",
//     body,
//   });
// };
// export const putFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { body } = req;

//   res.json({
//     msg: "Se acatualizó la finca",
//     body,
//     id,
//   });
// };
// export const deleteFinca = (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.json({
//     msg: "Se Elimino el finca",
//     id,
//   });
// };
