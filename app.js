
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let pokemonActual = null;

async function searchPokemon() {
  const nombrePokemon = document.getElementById("pokemon").value.trim();
  const contenedorResultado = document.getElementById("resultado");

  if (!nombrePokemon) return;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`,
    );

    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    
    pokemonActual = {
      id: data.id,
      nombre: data.name.toUpperCase(),
      imagen: data.sprites.front_default,
    };
    
    
    contenedorResultado.innerHTML = `
      <div class="card text-center shadow-sm">
        <img src="${pokemonActual.imagen}" class="card-img-top bg-light" alt="${pokemonActual.nombre}">
        <div class="card-body">
          <h5 class="card-title">${pokemonActual.nombre}</h5>
          <p class="card-text">Nº ${pokemonActual.id}</p>
        </div>
      </div>
    `;

  } catch (error) {
    contenedorResultado.innerHTML = `
      <div class="alert alert-danger text-center" role="alert">
        ${error.message}
      </div>
    `;
    pokemonActual = null;
  }
}

function saveFavorite() {
    
    if (!pokemonActual) {
        alert("Primero busca un Pokémon válido.");
        return;
    }

    
    const existe = buscarFavorito(pokemonActual.id);

    if (!existe) {
        favoritos.push(pokemonActual);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        updateFavoritesList(); 
    } else {
        alert("Este Pokémon ya está en tus favoritos.");
    }
}   

function buscarFavorito(id) {
    return favoritos.find(fav => fav.id === id) || null;
}

function updateFavoritesList() {
    const contenedor = document.getElementById("favoritos");
    contenedor.innerHTML = "";

    
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    favoritos.forEach(pokemon => {
        const col = document.createElement("div");
        col.classList.add("col");

        col.innerHTML = `
            <div class="card h-100 text-center shadow-sm">
                <img src="${pokemon.imagen}" class="card-img-top bg-light" alt="${pokemon.nombre}">
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${pokemon.nombre.toLowerCase()}</h5>
                </div>
            </div>
        `;
        contenedor.appendChild(col); 
    });
}


document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesList();
});