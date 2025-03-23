import { Bien, materialBienes } from "./Bien.js";
import { Cliente, razaCliente } from "./Cliente.js";
import { Mercader, tipoMercader } from "./Mercader.js";
import { Transaccion, NuevaTransaccion } from "./Transaccion.js";
import { Inventario } from "./Inventario.js";
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
      const añadir = await inquirer.prompt([
        {type:'input', name:'id_cl', message:'Id del cliente'},
        { type: 'input', name: 'nombre', message: 'Nombre del cliente:' },
        { type: 'input', name: 'ubicacion', message: 'Ubicación del cliente:' },
        { type: 'input', razaCliente: 'raza', message: 'Raza del cliente:' }
      ]);
      let raza : razaCliente = añadir.raza;
      if(Number(añadir.id_cl) in gestorDB.gestorCliente.getIDs()){
        console.log("Ese id ya está ocupado.\n");
        break;
      }
      const nuevoCliente = new Cliente(Number(añadir.id), añadir.nombre, añadir.ubicacion, raza)
      gestorDB.gestorCliente.añadirCliente(nuevoCliente);
      console.log('Cliente añadido con éxito.');
    break;
    case 'Eliminar Cliente':
      const respuestas = await inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID del cliente a eliminar'}
      ]);
      const eliminar = gestorDB.gestorCliente.buscarID(respuestas.id);
      if (eliminar !== undefined) {
        gestorDB.gestorCliente.eliminarCliente(eliminar);
      } else {
        console.log("No existe cliente con ese ID.\n");
      }
    break;
    case 'Modificar Cliente':
      const modificarID = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del cliente a modificar:' }
      ]);
      const idCliente = Number(modificarID.id);
      if (!gestorDB.gestorCliente.buscarID(idCliente)) {
        console.log("No existe cliente con ese ID.\n");
        break;
      }
      const { campo } = await inquirer.prompt([
        {
          type: 'list',
          name: 'campo',
          message: '¿Qué desea modificar?',
          choices: ['Nombre', 'Ubicación', 'Raza', 'Cancelar']
        }
      ]);
      if (campo === 'Cancelar') break;
      const nuevoValor = await inquirer.prompt([
        { type: 'input', name: 'valor', message: `Nuevo ${campo.toLowerCase()} del cliente:` }
      ]);
      let exito = false;
      if (campo === 'Nombre') exito = gestorDB.gestorCliente.modificarNombre(idCliente, nuevoValor.valor);
      else if (campo === 'Ubicación') exito = gestorDB.gestorCliente.modificarUbicacion(idCliente, nuevoValor.valor);
      else if (campo === 'Raza') {
        let nueva_raza : razaCliente = nuevoValor.valor;
        exito = gestorDB.gestorCliente.modificarRaza(idCliente, nueva_raza);
      }
      if (exito) {
        console.log('Cliente modificado con éxito.');
        await gestorDB.outDB();
      } else {
        console.log('No se pudo modificar el cliente.');
      }
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

/**
 * Funcion para poder manejar las opciones del videojuego cuando el usuario
 * quiere gestionar a los mercaderes de la base de datos
 */
async function gestionarMercaderes() {
  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: 'Seleccione una opción para mercaderes:',
      choices: [
        'Añadir Mercader',
        'Eliminar Mercader',
        'Modificar Mercader',
        'Consultar Mercaderes',
        'Buscar por nombre',
        'Buscar por ubicación',
        'Buscar por tipo',
        'Volver'
      ]
    }
  ]);
  switch (accion) {
    case 'Añadir Mercader':
      const añadir_m = await inquirer.prompt([
        {type:'input', name:'id_m', message:'Id del mercader'},
        { type: 'input', name: 'nombre', message: 'Nombre del mercader:' },
        { type: 'input', name: 'ubicacion', message: 'Ubicación del mercader:' },
        { type: 'input', name: 'tipo', message: 'Tipo del mercader:' }
      ]);
      let tipo_m : tipoMercader = añadir_m.tipo;
      if(Number(añadir_m.id_m) in gestorDB.gestorMercaderes.getIDs()){
        console.log("Ese id ya está ocupado.\n");
        break;
      }
      const nuevoMercader = new Mercader(Number(añadir_m.id), añadir_m.nombre, añadir_m.ubicacion, tipo_m)
      gestorDB.gestorMercaderes.añadirMercader(nuevoMercader);
      console.log('Mercader añadido con éxito.');
    break;
    case 'Eliminar Mercader':
      const elim_m = await inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID del mercader a eliminar'}
      ]);
      const eliminar = gestorDB.gestorMercaderes.buscarID(elim_m.id);
      if (eliminar !== undefined) {
        gestorDB.gestorMercaderes.eliminarMercader(eliminar);
      } else {
        console.log("No existe mercader con ese ID.\n");
      }
    break;
    case 'Modificar Mercader':
      const modificarM = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del mercader a modificar:' }
      ]);
      const idMercader = Number(modificarM.id);
      if (!gestorDB.gestorMercaderes.buscarID(idMercader)) {
        console.log("No existe Mercader con ese ID.\n");
        break;
      }
      const { campo } = await inquirer.prompt([
        {
          type: 'list',
          name: 'campo',
          message: '¿Qué desea modificar?',
          choices: ['Nombre', 'Ubicación', 'Tipo', 'Cancelar']
        }
      ]);
      if (campo === 'Cancelar') break;
      const nuevoValor = await inquirer.prompt([
        { type: 'input', name: 'valor', message: `Nuevo ${campo.toLowerCase()} del mercader:` }
      ]);
      let exito = false;
      if (campo === 'Nombre') exito = gestorDB.gestorMercaderes.modificarNombre(idMercader, nuevoValor.valor);
      else if (campo === 'Ubicación') exito = gestorDB.gestorMercaderes.modificarUbicacion(idMercader, nuevoValor.valor);
      else if (campo === 'Tipo') {
        let nuevo_tipo : tipoMercader = nuevoValor.valor;
        exito = gestorDB.gestorMercaderes.modificarTipo(idMercader, nuevo_tipo);
      }
      if (exito) {
        console.log('Mercader modificado con éxito.');
        await gestorDB.outDB();
      } else {
        console.log('No se pudo modificar el mercader.');
      }
    break;
    case 'Consultar Mercaderes':
      console.log(gestorDB.gestorMercaderes.coleccionMercaderes);
    break;
    case 'Buscar por nombre':
      const buscar_nombre_m = await inquirer.prompt([
        {type: 'input', name: 'nombre', message:'Nombre del mercader a buscar'}
      ]);
      gestorDB.gestorMercaderes.buscarNombre(buscar_nombre_m.nombre);
    break;
    case 'Buscar por ubicación':
      const buscar_ubi_m = await inquirer.prompt([
        {type: 'input', name:'ubicacion', message: 'Ubicacion de los mercaderes a buscar'}
      ]);
      gestorDB.gestorMercaderes.buscarUbicacion(buscar_ubi_m.ubicacion);
    break;
    case 'Buscar por tipo':
      const tipo = await inquirer.prompt([
        {type: 'input', name:'tipo_m', message: 'Tipo de los mercaderes a buscar (Herrero, Alquimista, Mercader general)'}
      ])
      let tipo_buscar : tipoMercader = tipo.tipo_m;
      gestorDB.gestorMercaderes.buscarTipo(tipo_buscar);
    break;
    case 'Volver':
    return;
  }
}

/**
 * Funcion para gestionar los bienes del inventario por parte del
 * usuario que emplea nuestro juego 
 */
async function gestionarInventario() {
  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: 'Seleccione una opción para el inventario:',
      choices: [
        'Añadir un Bien',
        'Eliminar un Bien',
        'Modificar un Bien',
        'Consultar Inventario',
        'Consultar un Bien',
        'Volver'
      ]
    }
  ]);
  switch(accion){
    case 'Añadir un bien':
      const añadir_b = await inquirer.prompt([
        {type:'input', name:'id_b', message:'Id del bien'},
        { type: 'input', name: 'nombre', message: 'Nombre del bien:' },
        { type: 'input', name: 'descripcion', message: 'Descripción del bien:' },
        {type: 'input', name: 'material', message: 'Material del bien: '},
        {type: 'input', name: 'peso', message: 'Peso del bien: '},
        { type: 'input', name: 'valor', message: 'Valor en coronas del bien:' }
      ]);
      let tipo_m : materialBienes = añadir_b.tipo;
      if(Number(añadir_b.id_b) in gestorDB.inventario.getIDs()){
        console.log("Ese id ya está ocupado.\n");
        break;
      }
      const nuevoBien = new Bien(Number(añadir_b.id_b), añadir_b.nombre, añadir_b.descripcion, añadir_b.tipo_m, Number(añadir_b.peso), Number(añadir_b.valor));
      gestorDB.inventario.añadirBien(nuevoBien);
      console.log('Mercader añadido con éxito.');
    break;
    case 'Eliminar un Bien' :
      const elim_b = await inquirer.prompt([
        {type: 'input', name: 'id', message: 'ID del bien a eliminar'}
      ]);
      const eliminar = gestorDB.inventario.buscarID(Number(elim_b.id));
      if (eliminar !== undefined) {
        gestorDB.inventario.eliminarBien(eliminar);
      } else {
        console.log("No existe mercader con ese ID.\n");
      }
    break;
    case 'Modificar un Bien' :
      const modificarB = await inquirer.prompt([
        { type: 'input', name: 'id', message: 'ID del mercader a modificar:' }
      ]);
      const idBien = Number(modificarB.id);
      if (!gestorDB.inventario.buscarID(idBien)) {
        console.log("No existe Bien con ese ID.\n");
        break;
      }
      const { campo } = await inquirer.prompt([
        {
          type: 'list',
          name: 'campo',
          message: '¿Qué desea modificar?',
          choices: ['Nombre', 'Descripcion', 'Material', 'Peso', 'Valor', 'Cancelar']
        }
      ]);
      if (campo === 'Cancelar') break;
      const nuevoValor = await inquirer.prompt([
        { type: 'input', name: 'valor', message: `Nuevo ${campo.toLowerCase()} del bien:` }
      ]);
      let exito = false;
      if (campo === 'Nombre') exito = gestorDB.inventario.modificarNombre(idBien, nuevoValor.valor);
      else if (campo === 'Descipcion') exito = gestorDB.inventario.modificarDescripcion(idBien, nuevoValor.valor);
      else if (campo === 'Peso') exito = gestorDB.inventario.modificarPeso(idBien, Number(nuevoValor.valor));
      else if (campo === 'Valor') exito = gestorDB.inventario.modificarValorCoronas(idBien, Number(nuevoValor.valor));
      else if (campo === 'Material') {
        let nuevo_material : materialBienes = nuevoValor.valor
        exito = gestorDB.inventario.modificarMaterial(idBien, nuevo_material);
      }  
      if (exito) {
        console.log('Cliente modificado con éxito.');
        await gestorDB.outDB();
      } else {
        console.log('No se pudo modificar el cliente.');
      }
    break;
    case 'Consultar Inventario' :
      console.log(gestorDB.inventario.MostrarBienes());
    break;
    case 'Consultar un Bien' :
      const consulta = await inquirer.prompt([
        {type: 'input', name:'consulta', message: 'Nombre o descripción del bien a buscar: '},
        {type: 'input', name: 'formato', message: 'Alfa para que sea alfabeticamente, num para que sea por valor en coronas: '},
        {type: 'input', name:'orden', message: 'Orden, asc para ascendete o desc para descendente: '}
      ]);
      gestorDB.inventario.consultarBien(consulta.consulta, consulta.formato, consulta.orden);
    break;
    case 'Volver' :
    return;
  }
}

async function hacerTransaccion() {
  // console.log('Funcionalidad aún no implementada.');
  const { accion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'accion',
      message: 'Seleccione una opción para la transaccion:',
      choices: [
        'Comprar',
        'Vender',
        'Devolver',
        'Volver'
      ]
    }
  ]);
  switch(accion) {
    case 'Comprar':
      const { idBienComprar } = await inquirer.prompt([{
        type: 'input',
        name: 'idBienComprar',
        message: 'Ingrese el ID del bien que desea comprar:',
        validate: (input) => !isNaN(input) ? true : 'Por favor, ingrese un número válido.',
      }]);
      const bienComprar = gestorDB.inventario.buscarID(Number(idBienComprar));
      if (bienComprar) {
        gestorDB.inventario.añadirBien(bienComprar); // Asumimos que ya se sabe qué bien se compra
        console.log(`Bien '${bienComprar.nombre}' comprado con éxito.`);
      } else {
        console.log('Bien no encontrado en la colección.');
      }
      break;
    case 'Vender': 
      const { idBienVender } = await inquirer.prompt([
        {
          type: 'input',
          name: 'idBienVender',
          message: 'Ingrese el ID del bien que desea vender:',
          validate: (input) => !isNaN(input) ? true : 'Por favor, ingrese un número válido.',
        }
      ]);
      const bienVender = gestorDB.inventario.buscarID(Number(idBienVender));
      if (bienVender) {
        const mensajeEliminacion = gestorDB.inventario.eliminarBien(bienVender);
        console.log(mensajeEliminacion || 'Error al vender el bien.');
      } else {
        console.log('Bien no encontrado en la colección.');
      }
      break;
    case 'Devolver':
      // Seleccionar el bien a devolver
      const { idBienDevolver } = await inquirer.prompt([
        {
          type: 'input',
          name: 'idBienDevolver',
          message: 'Ingrese el ID del bien que desea devolver:',
          validate: (input) => !isNaN(input) ? true : 'Por favor, ingrese un número válido.',
        }
      ]);
      const bienDevolver = gestorDB.inventario.buscarID(Number(idBienDevolver));
      if (bienDevolver) {
        gestorDB.inventario.añadirBien(bienDevolver); // Suponemos que la devolución es igual a una compra
        console.log(`Bien '${bienDevolver.nombre}' devuelto correctamente.`);
      } else {
        console.log('Bien no encontrado en la colección.');
      }
      break;
    case 'Volver':
      console.log('Volviendo al menú principal...');
      break;
    default:
      console.log('Opción no válida.');
  }
}

/**
 * Funcion que permite gestionar las opciones de informe que 
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


