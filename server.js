import express from 'express';
const app = express();

// Middleware para servir los archivos estáticos de tu frontend
app.use(express.static('.'));

// Ruta de información del backend
app.get('/api/info', (req, res) => {
  res.json({
    mensaje: "Bienvenido al backend de tu generador de paletas",
    estado: "Activo"
  });
});

// NUEVO: Manejo básico para cuando buscan una ruta que NO existe (Control de errores / Fallos)
app.use((req, res) => {
  res.status(404).send("¡Ups! La página o ruta que buscas no existe en este servidor.");
});

// Definimos el puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});