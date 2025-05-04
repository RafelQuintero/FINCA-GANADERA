//PAra mañana creremos una clse que contenga todos las funcione  getnimales, getanimal, postanimal updateanimal gdelete animal
//igual  se creará el archivo animal.ts para la rutas  del os animales.

//* craremos un class para manejar todas las funicon que mnajeran las ruta del tipo animal
import { Request, Response } from "express";
import Rebaño from "../models/rebaño";
import Finca from "../models/finca";
import Usuario from "../models/usuario";

class animalesControllers {
  public getAnimales = async (req: Request, res: Response) => {
    try {
      const animales = await Rebaño.findAll({
        include: { model: Usuario, as: "Usuario", where: { estado: true } },
        where: { estado: true }, //?esta condicon es para que no aparezcan los animales eliminados
      });

      if (animales.length === 0) {
        res.status(404).json({
          msg: "No hay animales    en  la finca; ya que el usuario no esta activo o no existe, en la base de datos  ",
          animales,
        });
        return;
      }
      res.json({
        msg: "Este es getAnimales   de un usuario de la finca",
        animales,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador ok",
        error,
      });
    }
  };

  public getAnimal = async (req: Request, res: Response) => {
    const { id } = req.params; //este el id del animal que se quiere mostrar

    try {
      const animal = await Rebaño.findOne({
        where: { id: id },
        include: { model: Usuario, as: "Usuario", where: { estado: true } },
      });

      if (!animal) {
        res.status(404).json({
          msg: `No hay animal  con el id: ${id}   en  la finca; o el usuario no esta activo o no existe, en la base de datos`,
          animal,
        });
        return;
      }

      res.json({
        msg: "Este es el getAnimal para mostrar un semental de un usuario de la finca",
        id, //es el id del animla que se quiere mostrar
        animal,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //*** */

  public postAnimal = async (req: Request, res: Response) => {
    const { body } = req;
    try {
      const animal = Rebaño.build(body);
      await animal.save();

      res.json({
        msg: " Es el postAnimal para cargar un animal en la base de datos  de un usuario de la finca",

        animal, //este es el animal que se guardo en la base de datos
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };

  public UpdateAnimal = async (req: Request, res: Response) => {
    const { id } = req.params; //es el id del animla que se quiere actualizar

    const { body } = req;

    try {
      const animal = await Rebaño.findOne({
        where: { id: id, estado: true },
        include: { model: Usuario, as: "Usuario", where: { estado: true } },
      });
      if (!animal) {
        res.status(404).json({
          msg: `No hay animal con el id: ${id} en la base de datos o el usuario no esta activo `,
        });
        return;
      }
      await animal.update(body);
      res.json({
        msg: `Es el Update del animal: ${id}, que  se actualizaron`,
        id,
        body,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };

  public deleteAnimal = async (req: Request, res: Response) => {
    const { id } = req.params; //es el adi del animal que se quiere eliminar
    try {
      const animal = await Rebaño.findOne({
        where: {
          id: id,
          estado: true,
        },
        include: { model: Usuario, as: "Usuario", where: { estado: true } },
      });
      if (!animal) {
        res.status(404).json({
          msg: `No hay animal con el id: ${id} en la base de datos o el Animal no esta activo `,
        });
        return;
      }
      await animal.update({ estado: false });

      res.json({
        msg: "Es el deleteAnimal  Eliminado ",
        id,
        animal,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador ",
        error,
      });
    }
  };

  //creamos el controlador para ver los animales que esta finca en la finca
  //? para poder utilizarlo en las rutas
  //***   */
  public getAnimalesEnlaFinca = async (req: Request, res: Response) => {
    const { id } = req.params; //este es el id de la finca

    try {
      const finca = await Finca.findByPk(id);

      if (!finca) {
        res.status(404).json({
          msg: `No hay finca con el id: ${id} en la base de datos okey`,
        });
        return;
      }
      const animales = await Finca.findAll({
        include: { model: Rebaño, as: "Rebaño", where: { fincaId: id } },
      });

      res.json({
        msg: "Este es getAnimalesEnlaFinca  de la finca, debe mostrar los animales de la finca",
        id, //este es el id de la finca
        animales,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador",
        error,
      });
    }
  };
  //***   */
  //mostremos los animales de un usuario en particular queestan en la finca
  public getAnmalesdeunUsuario = async (req: Request, res: Response) => {
    const { id } = req.params; //este es el id del usuario

    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        res.status(404).json({
          msg: `No hay usuario con el id: ${id} en la base de datos por lo tanto no hay animales`,
        });
        return;
      }
      const animales = await Rebaño.findAll({
        include: { model: Usuario, as: "Usuario", where: { id: id } },
      });

      res.json({
        msg: "Este es getAnimalesdeunUsuario   de un usuario de la finca",
        id, //es el ad del usuario
        animales, //mostramos el usuario y los animales que tiene
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador para saber el error",
        error,
      });
    }
  };
}

export default animalesControllers;
