document
  .getElementById("irrebaño-form")
  .addEventListener("submit", async (evento) => {
    // *Con el codigo de abajo se evita que se recargue la apgina web
    evento.preventDefault();

    window.location.href = "http://localhost:8000/crudrebaño.html";
    console.log("Iendo a la pagina crudrebaño.html");
  });
