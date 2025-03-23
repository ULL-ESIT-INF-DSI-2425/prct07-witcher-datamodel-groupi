import { Bien, materialBienes } from "./Bien.js";
import { Cliente, razaCliente } from "./Cliente.js";
import { Mercader, tipoMercader } from "./Mercader.js";
import { Transaccion } from "./Transaccion.js";
import { Inventario } from "./Inventario.js";
import inquirer from "inquirer";
import { GestorCliente } from "./GestorClientes.js";
import { GestorMercader } from "./GestorMercaderes.js";
import { generarHistorialTransacciones, generarInformeIngresosGastos, generarInformeMasVendido, generarInformeStock } from "./tools.js"

const inventario = new Inventario([
  new Bien(1, "Espada de Plata de Kaer Morhen", "Forjada en Kaer Morhen para enfrentar monstruos", "Acero de Mahakam", 3.5, 150),
  new Bien(2, "Elixir de Golondrina", "Acelera la regeneración de heridas", "mutágenos de bestias antiguas", 0.2, 50),
  new Bien(3, "Ballesta de Caza", "Ideal para atacar desde la distancia", "cuero endurecido", 2.0, 90),
  new Bien(4, "Armadura de Grifo", "Ofrece protección equilibrada y agilidad", "cuero endurecido", 8.0, 300),
  new Bien(5, "Espada de Acero de Novigrado", "Usada por la guardia de la ciudad", "Acero de Mahakam", 3.0, 100),
  new Bien(6, "Pergamino de Señal Igni", "Contiene secretos para mejorar la señal Igni", "esencia mágica", 0.1, 75),
  new Bien(7, "Daga de Caza de Skellige", "Pequeña pero letal", "Acero de Mahakam", 1.0, 60),
  new Bien(8, "Botas de Brujo", "Aumentan la movilidad del portador", "cuero endurecido", 2.5, 120),
  new Bien(9, "Amuleto de Meditación", "Facilita la concentración mágica", "esencia mágica", 0.3, 40),
  new Bien(10, "Libro de Bestias", "Contiene información sobre monstruos comunes", "cuero endurecido", 1.2, 65),
  new Bien(11, "Guantes de Grifo", "Protegen sin perder agilidad", "cuero endurecido", 1.8, 85),
  new Bien(12, "Poción del Gato", "Permite ver en la oscuridad", "mutágenos de bestias antiguas", 0.1, 40),
  new Bien(13, "Mutágeno Verde", "Mejora resistencia física", "mutágenos de bestias antiguas", 0.2, 55),
  new Bien(14, "Espada Rúnica", "Incrustada con runas élficas", "Acero de Mahakam", 3.2, 200),
  new Bien(15, "Capucha de Caza", "Oculta y protege del frío", "cuero endurecido", 0.7, 30),
  new Bien(16, "Cota de Malla", "Usada por mercenarios experimentados", "Acero de Mahakam", 5.0, 180),
  new Bien(17, "Talismán Antimagia", "Protege contra hechizos", "esencia mágica", 0.5, 90),
  new Bien(18, "Piedra de Afilar Rúnica", "Mejora armas temporalmente", "esencia mágica", 1.0, 50),
  new Bien(19, "Poción de Maribor", "Recupera energía al instante", "mutágenos de bestias antiguas", 0.2, 45),
  new Bien(20, "Mapa de Tesoros", "Revela botines ocultos", "esencia mágica", 0.1, 70),
]);
const gestorCliente = new GestorCliente([
  new Cliente(1, "Geralt de Rivia", "Kaer Morhen", "Humano"),
  new Cliente(2, "Triss Merigold", "Novigrado", "Hechicero"),
  new Cliente(3, "Zoltan Chivay", "Novigrado", "Enano"),
  new Cliente(4, "Yennefer de Vengerberg", "Skellige", "Hechicero"),
  new Cliente(5, "Vesemir", "Kaer Morhen", "Humano"),
  new Cliente(6, "Lambert", "Kaer Morhen", "Humano"),
  new Cliente(7, "Eskel", "Kaer Morhen", "Humano"),
  new Cliente(8, "Ciri", "Skellige", "Humano"),
  new Cliente(9, "Iorveth", "Bosques del Pontar", "Elfo"),
  new Cliente(10, "Dijkstra", "Novigrado", "Humano"),
]);
const gestorMercader = new GestorMercader([
  new Mercader(1, "Hattori", "Novigrado", "Herrero"),
  new Mercader(2, "Fergus Graem", "Crow's Perch", "Herrero"),
  new Mercader(3, "Gremista", "Kaer Trolde", "Alquimista"),
  new Mercader(4, "Tomira", "White Orchard", "Alquimista"),
  new Mercader(5, "Éibhear Hattori", "Novigrado", "Mercader general"),
  new Mercader(6, "Bruno el Errante", "Velen", "Mercader general"),
  new Mercader(7, "Myron", "Oxenfurt", "Herrero"),
  new Mercader(8, "Kurt el Cazador", "Ard Skellig", "Mercader general"),
  new Mercader(9, "Lena", "Novigrado", "Alquimista"),
  new Mercader(10, "Igor", "Kaer Morhen", "Herrero"),
]);

const transacciones = new Transaccion();

/**
 * Funcion de introducción al juego The Witcher
 */
function Introduccion(): void {
  console.log("BIENVENIDO A THE WITCHER.\nSE ENCUENTRA USTED EN LA POSADA DEL LOBO BLANCO DONDE PODRA MANEJAR")
  console.log("LOS BIENES ACTUALES, LOS MERCADERES DISPONIBLES, Y CREAR O ELIMINAR JUGADORES Y ELEMENTOS DEL JUEGO.\nEmpecemos a jugar...\n");
}

/**
 * Programa main del proyecto donde podrán elegir las opciones de gestion iniciales
 * estamos haciendo uso del paquete inquirer.js
 */
async function main() {
  let salir = false;
  while (!salir) {
    const { categoria } = await inquirer.prompt([
      {
        type: 'list',
        name: 'categoria',
        message: 'Selecciona una categoría:',
        choices: [
          'Gestionar clientes',
          'Gestionar mercaderes',
          'Gestionar inventario',
          'Hacer una transacción',
          'Generar informes',
          'Salir'
        ]
      }
    ]);

    switch (categoria) {
      case 'Gestionar clientes':
        await gestionarClientes();
        break;
      case 'Gestionar mercaderes':
        await gestionarMercaderes();
        break;
      case 'Gestionar inventario':
        await gestionarInventario();
        break;
      case 'Hacer una transacción':
        await hacerTransaccion();
        break;
      case 'Generar informes' :
        await generarInforme();
        break;
      case 'Salir':
        salir = true;
        console.log('Saliendo...');
        break;
    }
  }
}
/**
 * Funcion que permite al usuario en prime time elegir las gestiones
 * que quiere hacer con los clientes
 */
async function gestionarClientes() {
  const { accion } = await inquirer.prompt({
    type: 'list',
    name: 'accion',
    message: 'Seleccione una opción para clientes:',
    choices: [
      'Añadir Cliente',
      'Eliminar Cliente',
      'Consultar Clientes',
      'Buscar por nombre',
      'Buscar por ubicación',
      'Buscar por raza',
      'Ordenar por ids',
      'Volver'
    ]
  });

  switch (accion) {
    case 'Añadir Cliente': {
      const nuevo = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del cliente:' },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'ubicacion', message: 'Ubicación:' },
        { type: 'input', name: 'raza', message: 'Raza (Humano, Elfo, Enano, Hechicero):' }
      ]);
      if (gestorCliente.getIDs().includes(Number(nuevo.id))) {
        console.log('ID ya existente.');
        break;
      }
      gestorCliente.añadirCliente(new Cliente(Number(nuevo.id), nuevo.nombre, nuevo.ubicacion, nuevo.raza as razaCliente));
      console.log('Cliente añadido.');
      break;
    }
    case 'Eliminar Cliente': {
      const { id } = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID del cliente a eliminar:' });
      const cliente = gestorCliente.buscarID(Number(id));
      if (cliente) {
        gestorCliente.eliminarCliente(cliente);
        console.log('Cliente eliminado.');
      } else {
        console.log('Cliente no encontrado.');
      }
      break;
    }
    case 'Consultar Clientes': {
      const lista = gestorCliente.MostrarClientes();
      console.log(lista.join("\n"));
      break;
    }
    case 'Buscar por nombre': {
      const { nombre } = await inquirer.prompt({ type: 'input', name: 'nombre', message: 'Nombre del cliente:' });
      console.log(gestorCliente.buscarNombre(nombre));
      break;
    }
    case 'Buscar por ubicación': {
      const { ubicacion } = await inquirer.prompt({ type: 'input', name: 'ubicacion', message: 'Ubicación del cliente:' });
      console.log(gestorCliente.buscarUbicacion(ubicacion));
      break;
    }
    case 'Buscar por raza': {
      const { raza } = await inquirer.prompt({ type: 'input', name: 'raza', message: 'Raza del cliente (Humano, Elfo, Enano, Hechicero):' });
      console.log(gestorCliente.buscarRaza(raza as razaCliente));
      break;
    }
    case 'Ordenar por ids': {
      gestorCliente.ordenarID();
      console.log("Se ha ordenado correctamente la lista de clientes por su id.\n");
      break;
    }
    case 'Volver':
      return;
  }
}

/**
 * Funcion para poder manejar las opciones del videojuego cuando el usuario
 * quiere gestionar a los mercaderes de la base de datos
 */
async function gestionarMercaderes() {
  const { accion } = await inquirer.prompt({
    type: 'list',
    name: 'accion',
    message: 'Seleccione una opción para mercaderes:',
    choices: [
      'Añadir Mercader',
      'Eliminar Mercader',
      'Consultar Mercaderes',
      'Buscar por nombre',
      'Buscar por ubicación',
      'Buscar por tipo',
      'Ordenar por ids',
      'Volver'
    ]
  });

  switch (accion) {
    case 'Añadir Mercader': {
      const nuevo = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del mercader:' },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'ubicacion', message: 'Ubicación:' },
        { type: 'input', name: 'tipo', message: 'Tipo (Herrero, Alquimista, Mercader general):' }
      ]);
      if (gestorMercader.getIDs().includes(Number(nuevo.id))) {
        console.log('ID ya existente.');
        break;
      }
      gestorMercader.añadirMercader(new Mercader(Number(nuevo.id), nuevo.nombre, nuevo.ubicacion, nuevo.tipo as tipoMercader));
      console.log('Mercader añadido.');
      break;
    }
    case 'Eliminar Mercader': {
      const { id } = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID del mercader a eliminar:' });
      const mercader = gestorMercader.buscarID(Number(id));
      if (mercader) {
        gestorMercader.eliminarMercader(mercader);
        console.log('Mercader eliminado.');
      } else {
        console.log('Mercader no encontrado.');
      }
      break;
    }
    case 'Consultar Mercaderes': {
      const lista = gestorMercader.MostrarMercaderes();
      console.log(lista.join("\n"));
      break;
    }
    case 'Buscar por nombre': {
      const { nombre } = await inquirer.prompt({ type: 'input', name: 'nombre', message: 'Nombre del mercader:' });
      console.log(gestorMercader.buscarNombre(nombre));
      break;
    }
    case 'Buscar por ubicación': {
      const { ubicacion } = await inquirer.prompt({ type: 'input', name: 'ubicacion', message: 'Ubicación del mercader:' });
      console.log(gestorMercader.buscarUbicacion(ubicacion));
      break;
    }
    case 'Buscar por tipo': {
      const { tipo } = await inquirer.prompt({ type: 'input', name: 'tipo', message: 'Tipo del mercader (Herrero, Alquimista, Mercader general):' });
      console.log(gestorMercader.buscarTipo(tipo as tipoMercader));
      break;
    }
    case 'Ordenar por ids' : {
      gestorMercader.ordenarID();
      console.log("Se ha ordenado correctamente la lista de mercaderes según su id.\n");
      break;
    }
    case 'Volver':
      return;
  }
}

/**
 * Funcion para gestionar los bienes del inventario por parte del
 * usuario que emplea nuestro juego 
 */
async function gestionarInventario() {
  const { accion } = await inquirer.prompt({
    type: 'list',
    name: 'accion',
    message: 'Seleccione una opción para el inventario:',
    choices: [
      'Añadir Bien',
      'Eliminar Bien',
      'Modificar Bien',
      'Consultar Bienes',
      'Consultar un Bien',
      'Ordenar por nombre',
      'Ordenar por valor',
      'Volver'
    ]
  });

  switch (accion) {
    case 'Añadir Bien': {
      const nuevo = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del bien:' },
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'descripcion', message: 'Descripción:' },
        { type: 'input', name: 'material', message: 'Material (Acero de Mahakam, cuero endurecido, esencia mágica, mutágenos de bestias antiguas):' },
        { type: 'input', name: 'peso', message: 'Peso:' },
        { type: 'input', name: 'valor', message: 'Valor en coronas:' },
      ]);
      if (inventario.getIDs().includes(Number(nuevo.id))) {
        console.log('ID ya existente.');
        break;
      }
      inventario.añadirBien(new Bien(Number(nuevo.id), nuevo.nombre, nuevo.descripcion, nuevo.material as materialBienes, Number(nuevo.peso), Number(nuevo.valor)));
      console.log('Bien añadido.');
      break;
    }
    case 'Eliminar Bien': {
      const { id } = await inquirer.prompt({ type: 'input', name: 'id', message: 'ID del bien a eliminar:' });
      const bien = inventario.buscarID(Number(id));
      if (bien) {
        inventario.eliminarBien(bien);
        console.log('Bien eliminado.');
      } else {
        console.log('Bien no encontrado.');
      }
      break;
    }
    case 'Modificar Bien': {
      const modificar = await inquirer.prompt([{ type: 'input', name: 'id', message: 'ID del bien a modificar:' }]);
      const idBien = Number(modificar.id);
      const bien = inventario.buscarID(idBien);
      if (!bien) {
        console.log("No existe Bien con ese ID.\n");
        break;
      }
      const { campo } = await inquirer.prompt({
        type: 'list',
        name: 'campo',
        message: '¿Qué desea modificar?',
        choices: ['Nombre', 'Descripcion', 'Material', 'Peso', 'Valor', 'Cancelar']
      });
      if (campo === 'Cancelar') break;
      const { valor } = await inquirer.prompt({ type: 'input', name: 'valor', message: `Nuevo ${campo.toLowerCase()} del bien:` });

      let exito = false;
      switch (campo) {
        case 'Nombre':
          exito = inventario.modificarNombre(idBien, valor);
          break;
        case 'Descripcion':
          exito = inventario.modificarDescripcion(idBien, valor);
          break;
        case 'Material':
          exito = inventario.modificarMaterial(idBien, valor as materialBienes);
          break;
        case 'Peso':
          exito = inventario.modificarPeso(idBien, Number(valor));
          break;
        case 'Valor':
          exito = inventario.modificarValorCoronas(idBien, Number(valor));
          break;
      }
      console.log(exito ? 'Bien modificado con éxito.' : 'No se pudo modificar el bien.');
      break;
    }
    case 'Consultar Bienes': {
      const lista = inventario.MostrarBienes();
      console.log(lista.join("\n"));
      break;
    }
    case 'Consultar un Bien': {
      const consulta = await inquirer.prompt([
        { type: 'input', name: 'consulta', message: 'Nombre o descripción del bien a buscar: ' },
        { type: 'input', name: 'formato', message: 'Alfa para que sea alfabeticamente, coronas para que sea por valor en coronas: ' },
        { type: 'input', name: 'orden', message: 'Orden, asc para ascendente o desc para descendente: ' }
      ]);
      const resultado = inventario.consultarBien(
        consulta.consulta,
        consulta.formato.toLowerCase() === 'alfa' ? 'alfa' : 'coronas',
        consulta.orden.toLowerCase() === 'asc' ? 'asc' : 'desc'
      );
      console.log("Resultados:", resultado);
      break;
    }
    case 'Ordenar por nombre' : {
      inventario.ordenarPorNombre();
      console.log("El inventario se ha ordenado por el nombre de los bienes.\n");
      break;
    }
    case 'Ordenar por valor' : {
      inventario.ordenarPorValorCoronas();
      console.log("El inventario se ha ordenado por el valor de los bienes.\n");
      break;
    }
    case 'Volver':
      return;
  }
}
/**
 * Funcion para gestionar transacciones
 */
async function hacerTransaccion() {
  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: 'Seleccione una opción para la transacción:',
      choices: ['Comprar', 'Vender', 'Devolver', 'Volver']
    }
  ]);

  switch (accion) {
    case 'Comprar': {
      const { idBienComprar, idMercader } = await inquirer.prompt([
        { type: 'input', name: 'idBienComprar', message: 'ID del bien a comprar:' },
        { type: 'input', name: 'idMercader', message: 'ID del mercader:' }
      ]);
      const bien = inventario.buscarID(Number(idBienComprar));
      if (bien) {
        transacciones.TransaccionCompra(Number(idMercader), [[bien.ID, 1]], bien.valorEnCoronas);
        console.log(`Bien '${bien.nombre}' comprado con éxito.`);
      } else {
        console.log('Bien no encontrado.');
      }
      break;
    }
    case 'Vender': {
      const { idBienVender, idCliente } = await inquirer.prompt([
        { type: 'input', name: 'idBienVender', message: 'ID del bien a vender:' },
        { type: 'input', name: 'idCliente', message: 'ID del cliente:' }
      ]);
      const bien = inventario.buscarID(Number(idBienVender));
      if (bien) {
        inventario.eliminarBien(bien);
        transacciones.TransaccionVenta(Number(idCliente), [[bien.ID, 1]], bien.valorEnCoronas);
        console.log(`Bien '${bien.nombre}' vendido con éxito.`);
      } else {
        console.log('Bien no encontrado.');
      }
      break;
    }
    case 'Devolver': {
      const { idTransaccion } = await inquirer.prompt({
        type: 'input',
        name: 'idTransaccion',
        message: 'ID de la transacción a devolver:'
      });
      transacciones.TransaccionDevolucion(Number(idTransaccion));
      console.log('Devolución realizada con éxito.');
      break;
    }
    case 'Volver':
      return;
  }
}

/**
 * Función que permite gestionar las opciones de informe que 
 * nuestro usuario quiere realizar a lo largo del juego
 */
async function generarInforme() {
  const { tipoInforme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tipoInforme',
      message: 'Seleccione el tipo de informe:',
      choices: [
        'Stock de bienes',
        'Bienes más vendidos',
        'Ingresos y gastos',
        'Historial de transacciones',
        'Volver'
      ]
    }
  ]);
  
  switch (tipoInforme) {
    case 'Stock de bienes':
      generarInformeStock(inventario);
      console.log('Informe de stock generado.');
      break;
    case 'Bienes más vendidos':
      generarInformeMasVendido(transacciones);
      console.log('Informe de bienes más vendidos generado.');
      break;
    case 'Ingresos y gastos':
      generarInformeIngresosGastos(transacciones);
      console.log('Informe de ingresos y gastos generado.');
      break;
    case 'Historial de transacciones':
      const respuestas = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'Id del personaje' },
        { type: 'input', name: 'tipo', message: 'Tipo del personaje (cliente o mercader)' }
      ]);
      let id_hist = Number(respuestas.id);
      if (respuestas.tipo !== "cliente" && respuestas.tipo !== "mercader") {
        console.log("Introduzca un tipo de personaje válido. Cliente o Mercader.\n");
      }
      generarHistorialTransacciones(transacciones, id_hist, respuestas.tipo);
      console.log('Informe de historial de transacciones generado.');
      break;
    case 'Volver':
      return;
  }
}

// MAIN
Introduccion();
main();