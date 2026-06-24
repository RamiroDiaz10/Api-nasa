const llaveApi = "u1K0n7IrA5iR8kLlhnZxnqoQTEkw7Q4W6FtVZUeG";
const urlApi =`https://api.nasa.gov/planetary/apod?api_key=${llaveApi}`;

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

let apodActual = null;

async function obtenerApod(fecha = "") {

  try {

    let url = urlApi;

    if (fecha) {
      url += `&date=${fecha}`;
    }

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Error consultando NASA");
    }

    const datos = await respuesta.json();

    apodActual = datos;

    mostrarApod(datos);

  } catch (error) {

    console.error(error);

    alert("No llego la información.");
  }
}

function mostrarApod(datos) {

  document.getElementById("titulo").textContent = datos.title;

  document.getElementById("fecha").textContent = datos.date;

  document.getElementById("descripcion").textContent = datos.explanation;

  const contenido =
    document.getElementById("contenido");

  if (datos.media_type === "image") {

    contenido.innerHTML = `
      <img
        src="${datos.url}"
        alt="${datos.title}"
        style="max-width:100%; border-radius:10px;"
      >
    `;

  } else {

    contenido.innerHTML = `
      <iframe
        src="${datos.url}"
        width="100%"
        height="500"
        allowfullscreen>
      </iframe>
    `;
  }
}

function buscarFavorito(fecha) {

  return favoritos.find(
    favorito => favorito.date === fecha
  );
}

function guardarFavorito() {

  if (!apodActual) {

    alert("No hay APOD cargada.");

    return;
  }

  if (buscarFavorito(apodActual.date)) {

    alert("Ya está en favoritos.");

    return;
  }

  favoritos.push(apodActual);

  localStorage.setItem(
    "favoritos",
    JSON.stringify(favoritos)
  );

  actualizarFavoritos();

  alert("Guardado correctamente.");
}

function actualizarFavoritos() {

  const contenedor =
    document.getElementById("favoritos");

  contenedor.innerHTML = "";

  favoritos.forEach(apod => {

    const card =
      document.createElement("div");

    card.classList.add("favorito-card");

    card.innerHTML = `
      <img
        src="${apod.url}"
        alt="${apod.title}"
        style="width:100%; height:180px; object-fit:cover;"
      >

      <h4>${apod.title}</h4>

      <p>${apod.date}</p>
    `;

    card.addEventListener("click", () => {

      apodActual = apod;

      mostrarApod(apod);
    });

    contenedor.appendChild(card);

  });
}

document.getElementById("btnBuscar").addEventListener("click", () => {

    const fecha =
      document.getElementById("fechaBusqueda").value;

    if (!fecha) {

      alert("Selecciona una fecha.");

      return;
    }

    const hoy =
      new Date()
      .toISOString()
      .split("T")[0];

    if (fecha > hoy) {

      alert("No puedes seleccionar fechas futuras.");

      return;
    }

    obtenerApod(fecha);

  });

document.getElementById("btnFavorito").addEventListener("click",guardarFavorito);
document.addEventListener("DOMContentLoaded",() => {

    actualizarFavoritos();

    obtenerApod();
  }
);