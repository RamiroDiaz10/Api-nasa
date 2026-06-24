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

obtenerAPOD();
