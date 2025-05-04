//*Se captura el  formuario por medio del id para hacer evento sumit por medio de listerner
// * de formulario

document
  .getElementById("usuario-form")
  .addEventListener("submit", async (e) => {
    //* Evitar que se  recarga la  página al capturar el evento
    e.preventDefault();

    ///**************************************//

    //* Se  Capturando datos del formulario  y se se guardan en la variable from
    const form = document.getElementById("usuario-form");
    //* usando  la variable FormData se  crea un objeto (Instanciamos)
    // * que contiene los datos del formulario
    const formData = new FormData(form);
    console.log("formData", formData);

    // Transformar FormData a un objeto JSON
    //*Con la variable data se crea un objeto vacio

    const data = {};
    //* Se recorre el objeto formData y se  guardan los datos en el objeto data
    // * con la clave y el valor
    formData.forEach((value, key) => {
      data[key] = value;
    });

    //*  SE Verifican  que los datos son correctos antes de enviarlos

    console.log("Datos a enviar:", data);
    //* Se envian los datos al servidor por medio de fetch
    // * se usa el metodo post y se envian los datos en formato json

    try {
      const response = await fetch("http://localhost:8000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), //* Convertimos el objeto data  en JSON
      });

      // * Verificar respuesta del servidor
      if (response.ok) {
        //* Se convierte la respuesta "response" en un objeto JSON

        const result = await response.json();
        //* Se imprime la respuesta en la consola

        console.log("Respuesta del servidor:", result);
        //* Se muestra un mensaje de exito l usuario que esta ingresando los datos
        alert("Usuario registrada con éxito");
        //* En caso de que la respuesta no sea correcta se muestra un mensaje de error
      } else {
        //* Se convierte la respuesta en texto

        const errorText = await response.text();
        //* Se imprime el error en la consola

        console.error("Error en la respuesta del servidor:", errorText);
        //* Se muestra un mensaje de error al usuario

        alert("Error al registrar Usuario: " + errorText);
      }
      //* En caso de que no se pueda conectar con el servidor se muestra un mensaje de error
      // * al usuario
    } catch (error) {
      //* Se imprime el error en la consola
      console.error("Error durante la conexión:", error);

      //* Se muestra un mensaje de error al usuario quien esta ingresando los datos
      alert("Error de conexión: verifica que el servidor esté corriendo.");
    }
  });
