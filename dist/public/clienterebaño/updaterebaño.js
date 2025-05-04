//*Codigo script para acualizar propietario

document
  .getElementById("update-rebaño-form")
  .addEventListener("submit", async (e) => {
    //* Evitamos que se recargue la págia web
    e.preventDefault();

    //*Capuraomso todos los datos del formulario

    const form = document.getElementById("update-rebaño-form");

    //* Utilizamos el metodo FormData para crear un objeto o instanciamos de tipo FormData
    const formData = new FormData(form);
    //* Cramos un objeto vacio llamado data para almecenar los datos del formulario
    const data = {};

    //* Recorremos los datos del formulario y los almacenamos en el objeto data excluyendo el id que contiene el formulario

    formData.forEach((value, key) => {
      if (key !== "id" && value.trim() !== "") {
        data[key] = value;
      }
    });
    //* Capturamos el id del propietario que está en el formulario para enviarselo al servidor por medio de la url

    const id = formData.get("id");
    console.log("ID del Animal es: ", id);
    //*Verificams que se escriba el id en el formulario
    if (!id || id.trim() === "") {
      alert("El id del propietario es: Obligatorio");
      return;
    }

    console.log("Datos para actualizar", data);
    console.log("ID del propietario", id);
    //* Hacemos la solicitud al servidor para actualizar el propietario
    //* Utilizamos el metodo fetch para hacer la solicitud al servidor

    try {
      const response = await fetch(`http://localhost:8000/api/animales/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Respuesta del servidor", result);
        alert("Animal actualizado correctamente");
      } else {
        const errorText = await response.json();
        console.error("Error en la respuesta del servidor", errorText);
        alert("Error al actualizar el propietario");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
      alert("Error al realizar la solicitud");
    }
  });
