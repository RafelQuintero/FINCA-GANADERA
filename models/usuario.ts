import { DataTypes, HasMany } from "sequelize";
import db from "../db/connection";
import Finca from "./finca";

const Usuario = db.define(
  "Usuario",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
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

export default Usuario;

//la relacion de las tablas(modelos) finca y unsuario
Finca.hasMany(Usuario, {
  foreignKey: "fincaId", //clave externa  se llamara fincaId
  sourceKey: "id", //Es la clcave de la finca que corresposda
});

Usuario.belongsTo(Finca, {
  foreignKey: "fincaId", //En la tabla Usuario se colocara una columna con la clave fincaid que es la clve foreignKey
  targetKey: "id", // es el id de la fina
});

// Finca.sync();
// Usuario.sync();
