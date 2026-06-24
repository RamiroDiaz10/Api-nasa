let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let apodActual = null;

async function obtenerAPOD() {

  const contenedorResultado =
    document.getElementById("resultado");

  try {

    const API_KEY =
      "u1K0n7IrA5iR8kLlhnZxnqoQTEkw7Q4W6FtVZUeG";

    const respuesta = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    );

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la APOD");
    }

    const data = await respuesta.json();

    apodActual = data;

    contenedorResultado.innerHTML = `
      <div class="card text-center shadow-sm">
        <img src="${data.url}" class="card-img-top bg-light" alt="${data.title}">
        <div class="card-body">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.date}</p>
        </div>
      </div>
    `;

  } catch (error) {

    contenedorResultado.innerHTML = `
      <div class="alert alert-danger text-center" role="alert">
        ${error.message}
      </div>
    `;

    apodActual = null;
  }
}

function saveFavorite() {

  if (!apodActual) {
    alert("Primero carga una APOD válida.");
    return;
  }

  const existe = buscarFavorito(apodActual.date);

  if (!existe) {

    favoritos.push(apodActual);

    localStorage.setItem(
      "favoritos",
      JSON.stringify(favoritos)
    );

    updateFavoritesList();

  } else {
    alert("Esta APOD ya está en favoritos.");

  }
}

function buscarFavorito(fecha) {

  return favoritos.find(
    fav => fav.date === fecha
  ) || null;

}

function updateFavoritesList() {

  const contenedor =
    document.getElementById("favoritos");

  contenedor.innerHTML = "";

  favoritos =
    JSON.parse(localStorage.getItem("favoritos"))
    || [];

  favoritos.forEach(apod => {

    const col =
      document.createElement("div");

    col.classList.add("col");

    col.innerHTML = `
      <div class="card h-100 text-center shadow-sm">
        <img src="${apod.url}" class="card-img-top bg-light" alt="${apod.title}">
        <div class="card-body">
          <h5 class="card-title">${apod.title}</h5>
          <p class="card-text">${apod.date}</p>
        </div>
      </div>
    `;

    col.addEventListener("click", () => {

      apodActual = apod;

      document.getElementById("resultado").innerHTML = `
        <div class="card text-center shadow-sm">
          <img src="${apod.url}" class="card-img-top bg-light" alt="${apod.title}">
          <div class="card-body">
            <h5 class="card-title">${apod.title}</h5>
            <p class="card-text">${apod.date}</p>
          </div>
        </div>
      `;
    });

    contenedor.appendChild(col);

  });
}

  document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesList();
  });