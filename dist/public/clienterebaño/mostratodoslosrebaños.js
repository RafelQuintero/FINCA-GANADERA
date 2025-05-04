document
  .getElementById("get-animales")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault(); //*Para qu no recargue la pagína web

    try {
      const response = await fetch("http://localhost:8000/api/animales", {
        method: "GET",
      });

      if (response.ok) {
        const propieAnimal = await response.json(); //?Convertimos la respuesta a JSON

        // alert("Propietarios obtenidas con exito: " + JSON.stringify(fincas));

        //* Verifcamos si 'fincas' es un array o si  hay que acceder a la propiedad 'propietarios' que esta en el get del backen que es un array de objetos
        const animaleslist = Array.isArray(propieAnimal) //?Verfica si propieDefinca es un array, si es  devuelve true ,
          ? //?
            //?
            //? al operador || (OR lógico).
            propieAnimal //? y lo que devuele es finca.
          : //?
            propieAnimal.animales || []; //?si es  falso, devuelve propieDefinca.datafincas, previamente analizdo,
        // ? si  este no existe (undefine), utiliza un arreglo vacio [] como valor por defecto gracias aal operador OR lógico.(||)
        // console.log("Fincas obtenidas:", fincalist);
        // alert("Fincas obtenidas con exito: " + JSON.stringify(fincalist));

        console.log("Propietarios obtenidos:", animaleslist);

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
        animaleslist.forEach((animal) => {
          const animalesDiv = document.createElement("div"); //?Creamos un div para cada propietario
          animalesDiv.style.marginBottom = "10px"; //? Espacio  que se creara entre los elementos

          //*Agregamos el contenido del propietario al div para mostrarlo en la pagina web
          animalesDiv.innerHTML = `
          <strong>ID del Animal:</strong> ${animal.id} <br>
          <strong>Tipo:</strong> ${animal.tipo} <br/>
          <strong>_numeración:</strong> ${animal.serial_numeracion} <br/>
          <strong>Año de ingreso:</strong> ${animal.año_ingreso} <br/>
          <strong>Vendido:</strong> ${animal.vendido} <br/>
          <strong>Año_Vendido:</strong> ${animal.año_vendido} <br/>
          <strong>Falleció:</strong> ${animal.fallecio} <br/>
          <strong>Año_Fallecido:</strong> ${animal.año_fallecido} <br/>
          
          <strong> id  de la Finca donde está:</strong> ${animal.fincaId} <br/>
          <strong>"id" dueño(Usuario)del Animal:</strong> ${animal.usuarioId} <br/>
          <strong> Nombre del dueño :</strong> ${animal.Usuario.nombre} <br/>
          <strong>Apellido del dueño :</strong> ${animal.Usuario.apellido} <br/>
        `;
          resultsContainer.appendChild(animalesDiv); //!?Agregamos el div al contenedor de resultados
        });
        alert("Propietarios obtenidos con exito");
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
