document
  .getElementById("get-usuarios")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault(); //*Para qu no recargue la pagína web

    try {
      const response = await fetch("http://localhost:8000/api/usuarios", {
        method: "GET",
      });

      if (response.ok) {
        const usuariosDefinca = await response.json(); //?Convertimos la respuesta a JSON

        // alert("Propietarios obtenidas con exito: " + JSON.stringify(fincas));

        //* Verifcamos si 'fincas' es un array o si  hay que acceder a la propiedad 'propietarios' que esta en el get del backen que es un array de objetos
        const usuarioslist = Array.isArray(usuariosDefinca) //?Verfica si propieDefinca es un array, si es  devuelve true ,
          ? //?
            //?
            //? al operador || (OR lógico).
            usuariosDefinca //? y lo que devuele es finca.
          : //?
            usuariosDefinca.usuarios || []; //?si es  falso, devuelve propieDefinca.datafincas, previamente analizdo,
        // ? si  este no existe (undefine), utiliza un arreglo vacio [] como valor por defecto gracias aal operador OR lógico.(||)
        // console.log("Fincas obtenidas:", fincalist);
        // alert("Fincas obtenidas con exito: " + JSON.stringify(fincalist));

        console.log("Usuarios obtenidos:", usuarioslist);

        //*Verificamos si hay fincas disponibles
        if (usuarioslist.length === 0) {
          alert("No hay usuarios  registrados .");
          return;
        }

        //!Seleccionar el contenedor donde se mostraran ls resultados
        //*Obtenemos el contenedor de resultados
        //*Usamos el id del contenedor para obtenerlo con getElementById
        //*El id del contenedor es "get-results"
        const resultsContainer = document.getElementById("get-results");
        //*Limpiemos previamente los resultados anteriores
        resultsContainer.innerHTML = ""; //? Limpiar el contenido del contenedor ante sde mostrar nuevas resultados

        //*Ahora  crearemos  elementos para cada  uno de los propietarios por
        //? medio de un bucle forEach, que nos permite recorrer el array de propietarios
        //? y crear un elemento div para cada uno de ellos.
        //? El  recibe una función callback, que a su vez tiene un parámetro que representa
        // ? cada elemento del array en cada iteración. En este caso, el parámetro es , que
        // ? representa un objeto dentro del array de propietarios.

        //?
        usuarioslist.forEach((usuarios) => {
          const usuariosDiv = document.createElement("div"); //?Creamos un div para cada propietario
          usuariosDiv.style.marginBottom = "10px"; //? Espacio  que se creara entre los elementos

          //*Agregamos el contenido del propietario al div para mostrarlo en la pagina web
          usuariosDiv.innerHTML = `
          <strong>ID:</strong> ${usuarios.id} <br>
          <strong>Nombres:</strong> ${usuarios.nombre} <br/>
          <strong>ApellidosU:</strong> ${usuarios.apellido} <br/>
          <strong>Correo:</strong> ${usuarios.email} <br/>
          <strong>"id" de la finca:</strong> ${usuarios.fincaId} <br/>
          <strong> Relacionado con la  Finca:</strong> ${usuarios.Finca.firsName} <br/>
        `;
          resultsContainer.appendChild(usuariosDiv); //!?Agregamos el div al contenedor de resultados
        });
        alert("Propietarios obtenidos con exito");
      } else {
        const errorText = await response.text();
        console.error("Error al obtener las propietarios:", errorText);
        alert("Error al obtener los propietarios:  " + errorText);
      }
    } catch (error) {
      console.log("Hubo un error en la conexión: ", error);
      alert(
        "Error de conexion, verificar que el servidor este corriendo  :  " +
          error
      );
    }
  });
