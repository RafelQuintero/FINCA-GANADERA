//*script para mostrar los datos de una  finca

document
  .getElementById("get-propietario")
  .addEventListener("submit", async (e) => {
    //*Con el codigo de abajo se evita que se recargue la apgina web
    e.preventDefault();

    //*Capturamos los datos del formulario para hacer más precisos ,
    // *en vez de tomarlo valor por valor
    const form = document.getElementById("get-propietario");

    //*Utilizamos el metodo FormData para crear un objeto
    // * o instanciamos de tipo FormData para que contenga los datos del formulario
    const formData = new FormData(form);

    //*Creamos un objeto vacio para almacenar los datos
    // * del formulario
    const data = {};

    //*Recorremos  el(los) datos del formulario
    // *y los almacenamos en el objeto data que es un objeto vacio
    // * en este caso es  el id que contiene el formulario
    formData.forEach((value, key) => {
      if (key == "id" && value.trim() !== "") {
        data[key] = value; //*  Estamos creando una nueva
        // *propiedad en el objeto data usando key como el
        // * nombre de la propiedad y value como el valor
        // *de la propiedad ejemplo:
        //*si:  key="firtname" y value="Pulguero" se añade
        // * al objeto data
      }
    });

    //*Capturamos el id de la finca que está en el formulario
    // * para enviarselo al servidor por medio de la url
    //* No se necesita est código  const id = formData.get("id");
    //*Verificamos el id que se esta recibiendo exista
    // *y su label no este vacio, Pero esta insruccion esta de mas (linea 41 al 44) porque le dije en el htlml que era obligatorio

    //*Verificamos los datos y el id son los que se estan enviados
    //console.log("Datos  del  id para mostrar el porpietario con su(s) finca(a)", data);

    console.log("ID de la propietario", data.id);
    //*hacermo un try catch para manejar los errores
    try {
      const response = await fetch(
        `http://localhost:8000/api/propietarios/${data.id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        //*Si la respuesta es correcta redireccionamos a la pagina de inicio
        console.log("Respuesta correcta del servidor", response);
        const propietarioFinca = await response.json();
        //* Mostramos los datos enviado en un json  de la respuesta en la consola de la web guardada en la varaiable result
        // console.log("Respuesta del servidor", propietarioFinca);
        // alert(" GET de Propietario correctamente");

        //*Verificamos si la respuesta es un objeto o un array

        const propietariolist =
          !Array.isArray(propietarioFinca) && propietarioFinca.datapropietario
            ? propietarioFinca.datapropietario
            : [];
        //console.log("Propietario obtenido:", propietari);
        // alert("Propietario obtenido con exito: ");

        //*Verifiquemos si la finca existe o no
        if (propietariolist.length === 0) {
          alert("No hay finca disponible con ese id para mostrar.");
          return;
        }
        //!Seleccionamos el contenedor donde se mostraran los resultados

        const resultsContainer = document.getElementById("get-results");

        //*Limpiemos previamente los resultados anteriores
        resultsContainer.innerHTML = ""; // Limpiar resultados anteriores

        //*Ahora se crearemos los datos de la finca obtenida

        const propietarioDiv = document.createElement("div");
        propietarioDiv.style.marginBottom = "10px"; // Espacio entre los elementos

        propietarioDiv.innerHTML = `
          <strong>ID:</strong> ${propietariolist.id} <br>
          <strong>Nombres:</strong> ${propietariolist.nombres} <br/>
          <strong>Apellidos:</strong> ${propietariolist.apellidos} <br/>
          
          <strong>"id" de la finca:</strong> ${propietariolist.fincaId} <br/>
          <strong>El  ( o los) propietario(s) de la Finca:</strong> ${propietariolist.Finca.firsName} <br/>
        `;
        resultsContainer.appendChild(propietarioDiv);

        alert(" Propietario obtenido con exito");
      } else {
        //*Si la respuesta no es correcta mostramos un mensaje de error
        const errorText = await response.json();
        console.error("Error al obtener el propietario: ", errorText);
        alert("Error al obtener el propietario: ", +errorText);
      }
    } catch (error) {
      console.log("error en la conexion", error);
      alert(
        "Error de conexion. Verifica si el servidor esta corriendo ",
        error
      );
    }
  });
