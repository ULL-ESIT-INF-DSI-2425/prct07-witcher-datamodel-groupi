import { Bien } from "./Bien.ts";
import { Cliente } from "./Cliente.ts";
import { Mercader } from "./Mercader.ts";
import { Transaccion } from "./Transaccion.ts";
import { Inventario } from "./Inventario.ts";
import inquirer from "inquirer";
//import { Gestora } from "./Gestoria.js";

function Introduccion() : void {
  console.log("BIENVENIDO A THE WITCHER.\nSE ENCUENTRA USTED EN LA POSADA DEL LOBO BLANCO DONDE PODRA MANEJAR")
  console.log("LOS BIENES ACTUALES, LOS MERCADERES DISPONIBLES, Y CREAR O ELIMINAR JUGADORES Y ELEMENTOS DEL JUEGO.\nEmpecemos a jugar...\n");
}

let Clientes : Cliente[] = [];
let Mercaderes : Mercader[] = [];
let Bienes : Bien[] = [];

// MAIN
Introduccion();

//const gestora = new Gestora();

async function mainMenu() {
  const { opcion } = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué acción deseas realizar?",
      choices: ["Generar informe", "Salir"],
    },
  ]);

  if (opcion === "Generar informe") {
    await menuInformes();
  } else {
    console.log("👋 Saliendo...");
    process.exit();
  }
}

async function menuInformes() {
  const { tipoInforme } = await inquirer.prompt([
    {
      type: "list",
      name: "tipoInforme",
      message: "Selecciona el tipo de informe:",
      choices: ["Stock de un bien", "Total de ventas", "Historial de un cliente", "Volver"],
    },
  ]);
/*
  if (tipoInforme === "Stock de un bien") {
    const { idBien } = await inquirer.prompt([
      { type: "input", name: "idBien", message: "Introduce el ID del bien:", validate: Number },
    ]);
    await gestora.generarInforme(Number(idBien));

  } else if (tipoInforme === "Total de ventas") {
    await gestora.generarInformeVentas();

  } else if (tipoInforme === "Historial de un cliente") {
    const { idCliente } = await inquirer.prompt([
      { type: "input", name: "idCliente", message: "Introduce el ID del cliente:", validate: Number },
    ]);
    await gestora.generarInformeTransaccionesCliente(Number(idCliente));

  } else {
    await mainMenu();
  }

  // Volver al menú principal
  await mainMenu();
  */
}

// Iniciar el programa
mainMenu();

