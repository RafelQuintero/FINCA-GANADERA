//*Codigo del script para actualizar Finca
document
  .getElementById("update-finca-form")
  .addEventListener("submit", async (e) => {
    ///* Evitamos que se recargue la pagina al capturar el evento
    e.preventDefault();

    //*CAPTUREMOS LOS DATOS DEL FORMULARIO PARA SER MAS PRECISO
    const form = document.getElementById("update-finca-form");

    //* UTILZAMOS EL METODO  FormData para crear    un objeto o instanciamos de tipo FormData
    //* Para que contenga los datos del formulario
    const formData = new FormData(form);

    //*Creamos un objeto vacio para almacenar los datos del formulario
    const data = {};
    //*Recorremos los datos del formularioy los alamcenamos el el objeto data excuyendo el id que contien el formulario
    formData.forEach((value, key) => {
      if (key !== "id" && value.trim() !== "") {
        //* Si la key que esta dentro del formulario es diferente a id y el valor no es vacio
        //* entonces almacenamos el valor en el objeto data.
        data[key] = value; //* Creamos  una nueva propiedad en el objeto data usando key como el nombre de
        //* la propiedad y value como el valor de la propiedad ejemplo:
        // *si:  key="firtname" y value="Pulguero" se añade al objeto data
      }
    });

    //*Capturamos el id  de la finca  que está en el formulario para enviarselo al servidor por medio  de l url
    const id = formData.get("id");
    //*Verificamos el id que se esta recibiendo exista  y su label no este vacio
    if (!id || id.trim() === "") {
      alert("El id de la finca  es: Obligatorio");
      return;
    }
    //*Verificamos   los datos y el id son los que se estan enviados
    console.log("Datos para actualizar", data);

    console.log("ID de la finca", id);

    //*hacermo un try catch para manejar los errores
    try {
      const response = await fetch(`http://localhost:8000/api/fincas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      //*Convertimos la respuesta a json

      if (response.ok) {
        //*Si la respuesta es correcta redireccionamos a la pagina de inicio
        const result = await response.json();
        //* Mostramos los datos de la respuesta en la consola de la web guardada en la varaiable result
        console.log("Respuesta del servidor", result);
        alert("Finca actualizada correctamente");
      } else {
        //*Si la respuesta no es correcta mostramos un mensaje de error
        const errorText = await response.json();
        console.error("Error en la respuesta del servidor", error);
        alert("Error al actualizar la finca", errorText);
      }
    } catch (error) {
      //*Si hay un error en el servidor lo mostramos en la consola
      console.error("Hubo  error durante la conxion en el servidor", error);
      alert(
        "Error de conexion, verifica si el servidor  está corriendo , o si el el id es el  correcto "
      );
    }

    //* Utilizamos el metodo fetch para hacer una peticion  PUT al servidor
  });
