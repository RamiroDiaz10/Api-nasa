const urlApi = "https://api.nasa.gov/planetary/apod?api_key=u1K0n7IrA5iR8kLlhnZxnqoQTEkw7Q4W6FtVZUeG"

let apodHoy = null;

async function obtenerApod(fecha = "") {

    try {

        let url = urlApi;

        if (fecha) {
            url += `&date=${fecha}`;
        }

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();

        apodActual = datos;

        mostrarApod(datos);

    } catch (error) {
        console.error(error);
        alert("No se obtuvo informacion.");
    }
}

function mostrarApod(datos) {

    document.getElementById("titulo").textContent =
        datos.title;

    document.getElementById("fecha").textContent =
        datos.date;

    document.getElementById("descripcion").textContent =
        datos.explanation;

    const contenido =
        document.getElementById("contenido");

    if (datos.media_type === "image") {

        contenido.innerHTML = `
            <img
                src="${datos.url}"
                alt="${datos.title}"
                width="600"
            >
        `;

    } else if (datos.media_type === "video") {

        contenido.innerHTML = `
            <iframe
                src="${datos.url}"
                width="600"
                height="400"
                allowfullscreen>
            </iframe>
        `;
    }
}

async function obtenerAPOD() {
  const response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=u1K0n7IrA5iR8kLlhnZxnqoQTEkw7Q4W6FtVZUeG",
  );

  const data = await response.json();

  document.getElementById("titulo").textContent = data.title;
  document.getElementById("fecha").textContent = data.date;
  document.getElementById("descripcion").textContent = data.explanation;

  const contenido = document.getElementById("contenido");

  if (data.media_type === "image") {
    contenido.innerHTML = `
      <img src="${data.url}" width="800">
    `;
  } else if (data.media_type === "video") {
    contenido.innerHTML = `
      <video width="800" controls>
        <source src="${data.url}" type="video/mp4">
      </video>
    `;
  }
}

obtenerApod();
