import { Bien } from "./Bien.ts";
import { Cliente, razaCliente } from "./Cliente.ts";
import { Mercader } from "./Mercader.ts";
import { Transaccion } from "./Transaccion.ts";
import { Inventario } from "./Inventario.ts";
import { GestorDB } from './DataBaseGestor.js';
import inquirer from "inquirer";

/**
 * Funcion de introducción al juego The Witcher
 */
function Introduccion() : void {
  console.log("BIENVENIDO A THE WITCHER.\nSE ENCUENTRA USTED EN LA POSADA DEL LOBO BLANCO DONDE PODRA MANEJAR")
  console.log("LOS BIENES ACTUALES, LOS MERCADERES DISPONIBLES, Y CREAR O ELIMINAR JUGADORES Y ELEMENTOS DEL JUEGO.\nEmpecemos a jugar...\n");
}

/**
 * Programa main del proyecto donde podrán elegir las opciones de gestion iniciales
 * estamos haciendo uso del paquete inquirer.js
 */
async function main() {
  await gestorDB.iniDB(); // cargamos los datos de los ficheros json
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
          'Generar informe',
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
      case 'Generar informe':
        await generarInforme();
      break;
      case 'Salir':
        gestorDB.outDB(); // guardamos los cambios realizados en los ficheros json
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
  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: 'Seleccione una opción para clientes:',
      choices: [
        'Añadir Cliente',
        'Eliminar Cliente',
        'Modificar Cliente',
        'Consultar Clientes',
        'Buscar por nombre',
        'Buscar por ubicación',
        'Buscar por raza',
        'Volver'
      ]
    }
  ]);
  switch (accion) {
    case 'Añadir Cliente':
      let id_counter : number = 0;
      const repsuestas = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre del cliente:' },
        { type: 'input', name: 'ubicacion', message: 'Ubicación del cliente:' },
        { type: 'input', razaCliente: 'raza', message: 'Raza del cliente:' }
      ]);
      let raza : razaCliente = repsuestas.raza;
      const nuevoCliente = new Cliente(id_counter,repsuestas.nombre, repsuestas.ubicacion, raza)
      gestorDB.gestorCliente.añadirCliente(nuevoCliente);
      console.log('Cliente añadido con éxito.');
      await gestorDB.outDB();
    break;
    case 'Eliminar Cliente':
      const respuestas = await inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID del cliente a eliminar'}
      ]);
      const eliminar = gestorDB.gestorCliente.buscarID(repsuestas.id);
      if (eliminar !== undefined) {
        gestorDB.gestorCliente.eliminarCliente(eliminar);
      } else {
        console.log("No existe cliente con ese ID.\n");
      }
    break;
    case 'Modificar Cliente':
      // FALTA HACER ESTOS METODOS
      console.log('Funcionalidad aún no implementada.');
    break;
    case 'Consultar Clientes':
      console.log(gestorDB.gestorCliente.coleccionClientes);
    break;
    case 'Buscar por nombre':
      const buscar_nombre = await inquirer.prompt([
        {type: 'input', name: 'nombre', message:'Nombre del cliente a buscar'}
      ]);
      gestorDB.gestorCliente.buscarNombre(buscar_nombre.nombre);
    break;
    case 'Buscar por ubicación':
      const buscar_ubi = await inquirer.prompt([
        {type: 'input', name:'ubicacion', message: 'Ubicacion de los clientes a buscar'}
      ]);
      gestorDB.gestorCliente.buscarUbicacion(buscar_ubi.ubicacion);
    break;
    case 'Buscar por raza':
      const buscar_raza = await inquirer.prompt([
        {type: 'input', name:'raza', message: 'Raza de los clientes a buscar(Humano, Elfo, Enano, Hechicero)'}
      ])
      let raza_buscar : razaCliente = buscar_raza.raza;
      gestorDB.gestorCliente.buscarRaza(raza_buscar);
    break;
    case 'Volver':
    return;
  }
}

async function gestionarMercaderes() {
  console.log('Funcionalidad aún no implementada.');
}

async function gestionarInventario() {
  console.log('Funcionalidad aún no implementada.');
}

async function hacerTransaccion() {
  console.log('Funcionalidad aún no implementada.');
}

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
      gestorDB.generarInformeStock();
      console.log('Informe de stock generado.');
    break;
    case 'Bienes más vendidos':
      gestorDB.generarInformeMasVendido();
      console.log('Informe de bienes más vendidos generado.');
    break;
    case 'Ingresos y gastos':
      gestorDB.generarInformeIngresosGastos();
      console.log('Informe de ingresos y gastos generado.');
    break;
    case 'Historial de transacciones':
      const respuestas = await inquirer.prompt ([
        {type: 'input', name:'id', message: 'Id del personaje'},
        {type:'input', name:'tipo', message: 'Tipo del personaje (cliente o mercader)'}
      ]);
      let id_hist : number = Number(respuestas.id);
      if (respuestas.tipo !== "cliente" || respuestas.tipo !== "mercader") {
        console.log("Introduzca un tip de personaje válido. Cliente o Mercader.\n");
      }
      gestorDB.generarHistorialTransacciones(id_hist, respuestas.tipo);
    break;
    case 'Volver':
    return;
  }
}

// MAIN
Introduccion();
const gestorDB = new GestorDB();
main();


