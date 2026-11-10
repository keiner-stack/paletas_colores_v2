// Diccionario de traducción de colores comunes a Hexadecimal
const colores = {
  rojo: 'FF0000',
  azul: '0000FF',
  verde: '008000',
  amarillo: 'FFFF00',
  naranja: 'FFA500',
  morado: '800080',
  rosa: 'FFC0CB',
  negro: '000000',
  blanco: 'FFFFFF',
  gris: '808080',
  cafe: 'A52A2A',
};

// Función para pedir la paleta a la API externa
export async function pedirPaletaAPI(colorIngresado) {
  // Convertir a minúsculas y buscar en el diccionario o usar la entrada directa
  const colorMinuscula = colorIngresado.toLowerCase();
  const colorHex = colores[colorMinuscula] || colorIngresado;

  // Hacer la petición asíncrona a TheColorAPI
  const respuesta = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=monochrome&count=5`
  );

  const datos = await respuesta.json();

  // Extraer únicamente los códigos Hexadecimales de la respuesta
  const listaColores = [];
  for (let i = 0; i < datos.colors.length; i = i + 1) {
    const colorObtenido = datos.colors[i].hex.value;
    listaColores.push(colorObtenido);
  }

  return listaColores;
}