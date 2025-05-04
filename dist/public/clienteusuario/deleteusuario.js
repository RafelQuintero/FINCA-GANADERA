//*crearemos el script para eliminar un propietario
//?Capturamos el formulario por medio del id para hacer el evento 'sumit' por medio de un 'listener' de formulario.

document
  .getElementById("delete-usuario")
  .addEventListener("submit", async (evento) => {
    //*Para qu no recargue la pagína web
    evento.preventDefault();

    //*Capturamos el formulario  que se llama por el id_"delete-propietario" y lo guardamos en la variable 'form'
    const form = document.getElementById("delete-usuario");

    //*Usando la variable 'FormData' se crea un objeto(instanciamos) para  que  contienga los datos del formulario
    const formData = new FormData(form);

    //*Transformar formData a un objeto JSON, previmaete creanos un objeto vacio llamdo data
    const data = {};

    //*Recorremos el objeto 'formData' y guardamos los datos en el objeto 'data' con la clave y el valor
    formData.forEach((value, key) => {
      if (key === "id") {
        data[key] = value;
      } else {
        console.log("No se puede enviar el campo:  ", key);
        alert("Por favor ingrese un id valido");
        return;
      }
    });
    //*Verificamos que los datos son correctos antes de enviarlos
    console.log("Datos a enviar:", data);

    const id = data.id;
    //?Verifequemos que se esta enviando el id correcto
    if (id === "") {
      alert("Por favor ingrese un id valido");
      return;
    }
    console.log("Id de la finca a eliminar:", id);
    //? Enviaremos los datos al servidor por medio de 'fetch'
    // ? se usa el método 'delete' y se envían los datos en formato JSON
    try {
      //?Capturamos el id de la finca para hacer el delete

      const response = await fetch(`http://localhost:8000/api/usuarios/${id}`, {
        method: "DELETE", //?Metodo delete
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Usuario eliminado exitosamente:" + result);
        alert("Usuario eliminado con exito: " + result);
      } else {
        //?Si hay un error en la respuesta del servidor mostrara la siguiente informacion
        const errorText = await response.text();
        console.error("Error en la respuesta del servidor:", errorText);
        alert("Error al eliminar la propietario:  " + errorText);
      }
    } catch (error) {
      console.error("Hubo un problema con delete request:", error);
      alert(
        "Error de conexion, verificar que el servidor este conectado , mostramos el error  " +
          error
      );
    }
    //*Limpiamos el formulario para que quede vacio
    // form.reset("delete-propietario");
  });
