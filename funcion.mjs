import { pedirPaletaAPI } from './api.mjs';

// Carga inicial del DOM y restauración de persistencia
document.addEventListener("DOMContentLoaded", () => {
    // Restaurar tema guardado en localStorage
    const html = document.documentElement;
    const modoGuardado = localStorage.getItem("modoColor");
    
    if (modoGuardado) {
        html.setAttribute("data-bs-theme", modoGuardado);
    }

    const btnCambiarTema = document.getElementById("btnCambiarTema");
    if (btnCambiarTema) {
        btnCambiarTema.addEventListener("click", alternarTema);
    }

    // Cargar última búsqueda guardada
    const ultima = localStorage.getItem("ultimaBusqueda");
    if (ultima && inputBusqueda) {
        inputBusqueda.value = ultima;
    }

    // Mostrar contador temporal de sesión en consola
    const contadorSesion = sessionStorage.getItem("cantidadBusquedas");
    if (contadorSesion && contadorSesion > 0) {
        console.log(`Llevas ${contadorSesion} búsquedas realizadas en esta pestaña.`);
    }
});

// Función para cambiar entre modo oscuro y claro
function alternarTema() {
    const html = document.documentElement;
    const temaActual = html.getAttribute("data-bs-theme");
    const nuevoTema = temaActual === "dark" ? "light" : "dark";
    
    html.setAttribute("data-bs-theme", nuevoTema);
    localStorage.setItem("modoColor", nuevoTema);
}

// Referencias a elementos de la interfaz
const btnBuscar = document.getElementById("btnBuscar");
const inputBusqueda = document.getElementById("inputBusqueda");
const textoMensaje = document.getElementById("textoMensaje");
const resultadoPaleta = document.getElementById("resultadoPaleta");

// Generar tarjetas de colores dinámicamente en el HTML
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

// Evento de clic para la búsqueda de paleta
if (btnBuscar) {
    btnBuscar.addEventListener("click", async () => {
        const termino = inputBusqueda.value.trim();

        // Validar que no esté vacío
        if (termino === "") {
            textoMensaje.className = "text-warning fw-bold";
            textoMensaje.textContent = "Por favor, escribe algo para buscar.";
            return;
        }

        try {
            textoMensaje.className = "text-muted";
            textoMensaje.textContent = "Buscando paleta...";

            // Consultar la API y pintar resultados
            const listaColores = await pedirPaletaAPI(termino);
            mostrarPaleta(listaColores);

            textoMensaje.className = "text-success fw-bold";
            textoMensaje.textContent = "¡Paleta encontrada con éxito!";
            
            // Guardar término en localStorage
            localStorage.setItem("ultimaBusqueda", termino);

            // Incrementar contador de sesión en sessionStorage
            let contadorSesion = parseInt(sessionStorage.getItem("cantidadBusquedas")) || 0;
            contadorSesion++;
            sessionStorage.setItem("cantidadBusquedas", contadorSesion);

        } catch (error) {
            console.error("Error al buscar la paleta:", error);
            textoMensaje.className = "text-danger fw-bold";
            textoMensaje.textContent = "Ocurrió un error al conectar con el servidor.";
        }
    });
}