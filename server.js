import express from 'express';
const app = express();

// Servir archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static('.'));

// Endpoint para verificar estado del servidor
app.get('/api/info', (req, res) => {
  res.json({
    mensaje: "Bienvenido al backend de tu generador de paletas",
    estado: "Activo"
  });
});

// Manejo de rutas no encontradas (Error 404)
app.use((req, res) => {
  res.status(404).send("¡Ups! La página o ruta que buscas no existe en este servidor.");
});

// Inicializar el puerto y levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});