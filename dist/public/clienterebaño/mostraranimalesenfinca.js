document
  .getElementById("rebañoFinca")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault(); //*Para qu no recargue la pagína web
    //?Capturamos los datos del formulario para hacer más precisos , en vez de tomarlo valor por valor
    const form = document.getElementById("rebañoFinca");
    //?Utilizamos el metodo FormData para crear un objeto o instanciamos de tipo FormData para que contenga los datos del formulario
    const formData = new FormData(form);
    //? oBTENRMOS EL ID DE LA FINCA QUE ESTA EN EL FORMULARIO
    //?para enviarselo al servidor por medio de la url
    const id = formData.get("id");

    try {
      const response = await fetch(
        `http://localhost:8000/api/animales/finca/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const animalesFinca = await response.json(); //?Convertimos la respuesta a JSON

        // alert("Propietarios obtenidas con exito: " + JSON.stringify(fincas));

        //* Verifcamos si 'fincas' es un array o si  hay que acceder a la propiedad 'propietarios' que esta en el get del backen que es un array de objetos
        const animaleslist = Array.isArray(animalesFinca) //?Verfica si propieDefinca es un array, si es  devuelve true ,
          ? //?
            //?
            //? al operador || (OR lógico).
            animalesFinca //? y lo que devuele es finca.
          : //?
            animalesFinca.animales || []; //?si es  falso, devuelve animalesFinca.animales, previamente analizdo,
        // ? si  este no existe (undefine), utiliza un arreglo vacio [] como valor por defecto gracias aal operador OR lógico.(||)
        console.log("Fincas obtenidas:", animaleslist);
        // alert("Animales obtenidas con exito: " + JSON.stringify(animaleslist));

        console.log("Animales que tiene la finca:", animaleslist);

        //*Verificamos si hay fincas disponibles
        if (animaleslist.length === 0) {
          alert("No hay aAnimales  registrados  en  fincas.");
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
        animaleslist.forEach((animales) => {
          const animalesDiv = document.createElement("div"); //?Creamos un div para cada propietario
          animalesDiv.style.marginBottom = "10px"; //? Espacio  que se creara entre los elementos

          //*Agregamos el contenido de los animales en  al div para mostrarlo en la pagina web
          animalesDiv.innerHTML = `
          <strong>Tipo:</strong> ${animales.Rebaño.tipo} <br/>
          <strong>id del animal:</strong> ${animales.Rebaño.id} <br/>
          <strong>serial_numeración:</strong> ${animales.Rebaño.serial_numeracion} <br/>
          <strong>Año de ingreso:</strong> ${animales.Rebaño.año_ingreso} <br/>
          <strong>Está en la Finca:</strong> ${animales.firsName} <br/>
          <strong>ID de la Finca:</strong> ${animales.id} <br>
          <strong> ID dueño(usuario) del animal:</strong> ${animales.Rebaño.usuarioId} <br/>
     
        `;
          resultsContainer.appendChild(animalesDiv); //!?Agregamos el div al contenedor de resultados
        });
        alert("Animales obtenidos con exito");
      } else {
        const errorText = await response.text();
        console.error("Error al obtener los animales:", errorText);
        alert("Error al obtener los animales:  " + errorText);
      }
    } catch (error) {
      console.log("Hubo un error en la conexión: ", error);
      alert(
        "Error de conexion, verificar que el servidor este corriendo  :  " +
          error
      );
    }
  });
