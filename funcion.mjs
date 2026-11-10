import { pedirPaletaAPI } from './api.mjs';

// --- 1. PERSISTENCIA Y CARGA DE TEMA (Bootstrap) ---
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const modoGuardado = localStorage.getItem("modoColor");
    
    if (modoGuardado) {
        html.setAttribute("data-bs-theme", modoGuardado);
    }

    const btnCambiarTema = document.getElementById("btnCambiarTema");
    if (btnCambiarTema) {
        btnCambiarTema.addEventListener("click", alternarTema);
    }

    // Cargar última búsqueda guardada en localStorage
    const ultima = localStorage.getItem("ultimaBusqueda");
    if (ultima && inputBusqueda) {
        inputBusqueda.value = ultima;
    }

    // Opcional: Leer sessionStorage al cargar la página
    const contadorSesion = sessionStorage.getItem("cantidadBusquedas");
    if (contadorSesion && contadorSesion > 0) {
        console.log(`Llevas ${contadorSesion} búsquedas realizadas en esta pestaña.`);
    }
});

function alternarTema() {
    const html = document.documentElement;
    const temaActual = html.getAttribute("data-bs-theme");
    const nuevoTema = temaActual === "dark" ? "light" : "dark";
    
    html.setAttribute("data-bs-theme", nuevoTema);
    localStorage.setItem("modoColor", nuevoTema);
}

// --- 2. LÓGICA DE BÚSQUEDA Y PINTADO DE PALETA ---
const btnBuscar = document.getElementById("btnBuscar");
const inputBusqueda = document.getElementById("inputBusqueda");
const textoMensaje = document.getElementById("textoMensaje");
const resultadoPaleta = document.getElementById("resultadoPaleta");

function mostrarPaleta(listaColores) {
    resultadoPaleta.innerHTML = '';
    const contenedor = document.createElement('div');
    contenedor.className = 'd-flex flex-wrap justify-content-center gap-3';

    listaColores.forEach(color => {
        const tarjeta = document.createElement('div');
        tarjeta.style.backgroundColor = color;
        tarjeta.style.width = '100px';
        tarjeta.style.height = '100px';
        tarjeta.style.borderRadius = '8px';
        tarjeta.className = 'd-flex align-items-end justify-content-center p-2 shadow-sm';

        const etiqueta = document.createElement('span');
        etiqueta.textContent = color;
        etiqueta.className = 'badge bg-dark text-white';

        tarjeta.appendChild(etiqueta);
        contenedor.appendChild(tarjeta);
    });

    resultadoPaleta.appendChild(contenedor);
}

if (btnBuscar) {
    btnBuscar.addEventListener("click", async () => {
        const termino = inputBusqueda.value.trim();

        if (termino === "") {
            textoMensaje.className = "text-warning fw-bold";
            textoMensaje.textContent = "Por favor, escribe algo para buscar.";
            return;
        }

        try {
            textoMensaje.className = "text-muted";
            textoMensaje.textContent = "Buscando paleta...";

            // Llamada real a la API y dibujado de colores
            const listaColores = await pedirPaletaAPI(termino);
            mostrarPaleta(listaColores);

            textoMensaje.className = "text-success fw-bold";
            textoMensaje.textContent = "¡Paleta encontrada con éxito!";
            
            // --- PERSISTENCIA ---
            // 1. Guardamos la última búsqueda de forma permanente
            localStorage.setItem("ultimaBusqueda", termino);

            // 2. Incrementamos el contador temporal en sessionStorage para esta sesión
            let contadorSesion = parseInt(sessionStorage.getItem("cantidadBusquedas")) || 0;
            contadorSesion++;
            sessionStorage.setItem("cantidadBusquedas", contadorSesion);

        } catch (error) {
            console.error("Error al buscar la paleta:", error);
            
            // Manejo de error visual con clases de Bootstrap
            textoMensaje.className = "text-danger fw-bold";
            textoMensaje.textContent = "Ocurrió un error al conectar con el servidor.";
        }
    });
}