import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario";
import Finca from "./finca";

const Rebaño = db.define(
  "Rebaño",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serial_numeracion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    año_ingreso: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vendido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "NO",
    },
    año_vendido: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NO",
    },

    fallecio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "NO",
    },

    año_fallecido: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NO",
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

export default Rebaño;

//relaicemos la relacion de usurio rebaño
Usuario.hasMany(Rebaño, {
  foreignKey: "usuarioId", //Es la clave externa que se le agreara a la tabla rebaño, creando ua columna llamada usuarioId
  sourceKey: "id", //es el id del ususrio que corresponda
});

Rebaño.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  targetKey: "id", //Este es el id de que sera asignado en la columna creada en la tabla rebaño con el nombre usuarioId
});
//*Segunda relacion de la tabla finca y rebaño

Finca.hasOne(Rebaño, {
  foreignKey: "fincaId", //clave externa  se llamara fincaId la cual se le agregara a la tabla rebaño
  sourceKey: "id", //Es la clcave de la finca que corresposda
});

Rebaño.belongsTo(Finca, {
  foreignKey: "fincaId", //En la tabla Rebaño se colocara una columna con la clave fincaid que es la clve foreignKey
  targetKey: "id", // es el id de la finca
});

// Usuario.sync();
// Rebaño.sync();
// Finca.sync();
