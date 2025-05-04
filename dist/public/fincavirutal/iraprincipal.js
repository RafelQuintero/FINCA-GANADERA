document
  .getElementById("regresarId")
  .addEventListener("submit", async (evento) => {
    // *Con el codigo de abajo se evita que se recargue la apgina web

    evento.preventDefault();

    window.location.href =
      "http://localhost:8000/fincavirtualpagprincipal.html";
    console.log("Regresando a la pagina principal");
  });
