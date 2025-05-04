document
  .getElementById("get-animal")
  .addEventListener("submit", async (evento) => {
    evento.preventDefault(); //*Para qu no recargue la pagína web

    //?Capturamos los datos del formulario para hacer más precisos , en vez de tomarlo valor por valor
    const form = document.getElementById("get-animal");
    //?Utilizamos el metodo FormData para crear un objeto o instanciamos de tipo FormData para que contenga los datos del formulario
    const formData = new FormData(form);
    //?obtengagome el id del animal que esta en el formulario
    //?para enviarselo al servidor por medio de la url
    const id = formData.get("id");

    try {
      const response = await fetch(`http://localhost:8000/api/animales/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const unAnimal = await response.json(); //?Convertimos la respuesta a JSON

        // alert("Propietarios obtenidas con exito: " + JSON.stringify(fincas));

        //* Verifcamos si 'fincas' es un array o si  hay que acceder a la propiedad 'propietarios' que esta en el get del backen que es un array de objetos
        const animallist = Array.isArray(unAnimal) //?Verfica si propieDefinca es un array, si es  devuelve true ,
          ? //?
            //?
            //? al operador || (OR lógico).
            unAnimal //? y lo que devuele es finca.
          : //?
            unAnimal.animal || []; //?si es  falso, devuelve propieDefinca.datafincas, previamente analizdo,
        // ? si  este no existe (undefine), utiliza un arreglo vacio [] como valor por defecto gracias aal operador OR lógico.(||)
        // console.log("Fincas obtenidas:", fincalist);
        // alert("Fincas obtenidas con exito: " + JSON.stringify(fincalist));

        console.log("Semental obtenido:", animallist);

        //*Verificamos si hay fincas disponibles
        if (animallist.length === 0) {
          alert("No hay aAnimal  registrado  en  finca.");
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

        const animalDiv = document.createElement("div"); //?Creamos un div para cada propietario
        animalDiv.style.marginBottom = "10px"; //? Espacio  que se creara entre los elementos

        //*Agregamos el contenido del propietario al div para mostrarlo en la pagina web
        animalDiv.innerHTML = `
          <strong>ID del Animal:</strong> ${animallist.id} <br>
          <strong>Tipo:</strong> ${animallist.tipo} <br/>
          <strong>Serial_numeración:</strong> ${animallist.serial_numeracion} <br/>
          <strong>Año de ingreso:</strong> ${animallist.año_ingreso} <br/>
          <strong>Vendido:</strong> ${animallist.vendido} <br/>
          <strong>Año_Vendido:</strong> ${animallist.año_vendido} <br/>
          <strong>Falleció:</strong> ${animallist.fallecio} <br/>
          <strong>Año_Fallecido:</strong> ${animallist.año_fallecido} <br/>
          
          <strong> id  de la Finca donde está:</strong> ${animallist.fincaId} <br/>
          <strong>"id" dueño(Usuario)del Animal:</strong> ${animallist.usuarioId} <br/>
          <strong> Nombre del dueño :</strong> ${animallist.Usuario.nombre} <br/>
          <strong>Apellido del dueño :</strong> ${animallist.Usuario.apellido} <br/>
        `;
        resultsContainer.appendChild(animalDiv); //!?Agregamos el div al contenedor de resultados

        alert("Semetal Obtenido con exito");
      } else {
        const errorText = await response.text();
        console.error("Error al obtener el animal:", errorText);
        alert("Error al obtener el semental:  " + errorText);
      }
    } catch (error) {
      console.log("Hubo un error en la conexión: ", error);
      alert(
        "Error de conexion, verificar que el servidor este corriendo  :  " +
          error
      );
    }
  });
