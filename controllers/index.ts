//nota como  no puedo hacer un index de esta manera ya que en cada unos de los archivos
//  no tengo un exportacion por defecto
//para solucionarlo es crear una clase en cada unos de los
//archivos de  la carpeta controllers para manejar cada na de las funcines
//Lo que se hace es lo siguiente:
//En cada uno de los archivo de controlles : finca , ususrios, propietario
//construimos una clase que contenga cada una de las funcione
//dde lo que se quiere hacer, y luego se hace una exportacion por defecto
//ejemplo:
//class fincaController{ //**  escribo aqui
// *funciones que hagan un
// * get post , put y delee}
//Luego hacemos una exportacion por defecto
// export  defaul fincaControllers

//esto es lo que engo que hacer mapar mañana
// para mejora e código
import fincaControllers from "./finca";
import usuariosControllers from "./usuarios";
import propietariosControllers from "./propietarios";
import animalesControllers from "./animal";

export {
  fincaControllers,
  usuariosControllers,
  propietariosControllers,
  animalesControllers,
};
