document
  .getElementById("get-fincas")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault(); //*Para qu no recargue la pagína web

    try {
      const response = await fetch("http://localhost:8000/api/fincas", {
        method: "GET",
      });

      if (response.ok) {
        const fincas = await response.json();
        // console.log("Fincas obtenidas:", fincas);
        // alert("Fincas obtenidas con exito: " + JSON.stringify(fincas));

        //* Verifcamos si 'fincas' es un array o si  hay que acceder a la propiedad 'datafincas' que es un arraye de objetos
        const fincalist = Array.isArray(fincas) //?Verfica si fincas es un array, si  devuelve true ,
          ? //?
            //?
            //? al operador || (OR lógico).
            fincas //? y lo que devuele es finca.
          : //?
            fincas.datafincas || []; //?si es  falso, devuelve fincas.datafincas, previasmente analizdo,
        // ? si  este no existe (undefine), utiliza un arreglo vacio [] como valor por defecto gracias aal operador OR lógico.(||)
        // console.log("Fincas obtenidas:", fincalist);
        // alert("Fincas obtenidas con exito: " + JSON.stringify(fincalist));

        //*Verificamos si hay fincas disponibles
        if (fincalist.length === 0) {
          alert("No hay fincas disponibles.");
          return;
        }

        //!Seleccionar el contenedor donde se mostraran ls resultados
        //*Obtenemos el contenedor de resultados
        //*Usamos el id del contenedor para obtenerlo con getElementById
        //*El id del contenedor es "get-results"
        const resultsContainer = document.getElementById("get-results");
        //*Limpiemos previamente los resultados anteriores
        resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

        //*Ahora se crearemos una lista de las fincas obtenidas
        fincalist.forEach((finca) => {
          const fincaDiv = document.createElement("div");
          fincaDiv.style.marginBottom = "10px"; // Espacio entre los elementos

          fincaDiv.innerHTML = `
          <strong>ID:</strong> ${finca.id} <br>
          <strong>Nombre:</strong> ${finca.firsName} <br/>
          <strong>Ubicación:</strong> ${finca.address} <br/>
          <strong>Municipio-Estado:</strong> ${finca.municipio_estado} <br/>
        `;
          resultsContainer.appendChild(fincaDiv);
        });
        alert("Fincas obtenids con exito");
      } else {
        const errorText = await response.text();
        console.error("Error al obtener las fincas:", errorText);
        alert("Error al obtener las fincas:  " + errorText);
      }
    } catch (error) {
      console.log("Hubo un error en la conexión: ", error);
      alert(
        "Error de conexion, verificar que el servidor este corriendo  :  " +
          error
      );
    }
  });
