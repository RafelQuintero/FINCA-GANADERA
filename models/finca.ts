import { DataTypes } from "sequelize";
import db from "../db/connection";

const Finca = db.define(
  "Finca",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    firsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipio_estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);
export default Finca;

//realizamos la relacion de que una finca (es la source) tien punchos propetario(target (destino o objetivo))
//Realizamos la relacio de la finca con el rbaño que contiene
//la relacion de las tablas(modelos) finca y unsuario

//!Nota: Para que se ejecute la sincronizacon debo decirle al
