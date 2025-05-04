import { DataTypes } from "sequelize";
import db from "../db/connection";

import Finca from "./finca";

const Propietario = db.define(
  "Proietario",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  //con el objeto de abajo, como tercer argumento,  estoy desactivado las dos  columnas que se  deben crear en la tabla  que son createAt y UpdateAt
  {
    timestamps: false,
  }
);

export default Propietario;

Finca.hasMany(Propietario, {
  foreignKey: "fincaId", //Clave de la finca
  sourceKey: "id", //Es el id de la finca
});
Propietario.belongsTo(Finca, {
  foreignKey: "fincaId", //Se asignara al proietario la clave de la finca a la cual  es dueño
  targetKey: "id", //Es el id de la finca
});

//Ahiar ejecutemos el comado para crear las tabals en la base de datos
// Finca.sync(); //Com el .sync() crea la tabla si no existe y si existe nos hace nada

// Propietario.sync();
