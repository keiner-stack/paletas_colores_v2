// nuestro objeto con funcion de diccionario
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

export async function pedirPaletaAPI(colorIngresado) {
  const colorMinuscula = colorIngresado.toLowerCase();
  const colorHex = colores[colorMinuscula] || colorIngresado;
  //pedir la informacion a la API usando fetch
  const respuesta = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=monochrome&count=5`
  );
  //tiene mucha info
  const datos = await respuesta.json();
  //la info que necesitamos
  const listaColores = [];
  //scar los codigos hex 
  for (let i = 0; i < datos.colors.length; i = i + 1) {
    const colorObtenido = datos.colors[i].hex.value;
    listaColores.push(colorObtenido);
  }
  return listaColores;
}