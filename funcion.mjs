import { pedirPaletaAPI } from './api.mjs';

const botonBuscar = document.querySelector('#btn-buscar');
const inputColor = document.querySelector('#input-color');
const contenedorPaleta = document.querySelector('#contenedor-paleta');
const textoMensaje = document.querySelector('#mensaje');

// Persistencia en el navegador: recupera el último color buscado (Diapositiva 4)
window.addEventListener('DOMContentLoaded', () => {
  const ultimoColor = localStorage.getItem('ultimoColorBuscado');
  if (ultimoColor) {
    inputColor.value = ultimoColor;
  }
});

function mostrarPaletaEnPantalla(listaColores) {
  contenedorPaleta.textContent = '';
  for (let i = 0; i < listaColores.length; i++) {
    const color = listaColores[i];

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-color shadow-sm';
    tarjeta.style.backgroundColor = color;

    const textoColor = document.createElement('p');
    textoColor.textContent = color;

    tarjeta.appendChild(textoColor);
    contenedorPaleta.appendChild(tarjeta);
  }
}

botonBuscar.addEventListener('click', async function () {
  const colorIngresado = inputColor.value.trim();
  if (colorIngresado === '') {
    textoMensaje.textContent = 'Por favor ingresar un color.';
    return;
  }
  
  // Guardamos el color en localStorage (Diapositiva 4)
  localStorage.setItem('ultimoColorBuscado', colorIngresado);

  textoMensaje.textContent = 'Cargando paleta...';

  try {
    const listaColores = await pedirPaletaAPI(colorIngresado);
    mostrarPaletaEnPantalla(listaColores);
    textoMensaje.textContent = '¡Paleta generada correctamente!';
  } catch (error) {
    textoMensaje.textContent = 'Ocurrió un error al buscar la paleta.';
  }
});