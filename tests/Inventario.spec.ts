import { describe, test, beforeEach } from "vitest"
import { Bien } from "../src/Bien.ts"
import { Inventario } from "../src/Inventario.ts"
import { Mercader } from "../src/Mercader.ts";
import { Cliente } from "../src/Cliente.ts";

const bien1 = new Bien(1, "Espada", "Es una espada de plata", "Acero de Mahakam", 12, 1300);
const cliente1 = new Cliente(1,"Pepe","Velen","Humano");
const cliente2 = new Cliente(2,"Manolo","Kaer Trolde","enano");
const mercader1 = new Mercader(1, "Hattori","Novigrado", "Herrero");
const mercader2 = new Mercader(1234, "YoSoyPlex", "España" , "Alquimista");
const bien2 = new Bien(2, "Elixires de Golondrina", "Es un elixir de Golondrina ", "cuero endurecido", 7, 200);
let mycoleccion;

beforeEach(() => {
  mycoleccion = new Inventario([bien1],[cliente1], [mercader1]);
});
describe("THE WITCHER - Probando clase Inventario", () => {
  test("Añadir Bien", () => {
    mycoleccion.añadirBien(bien2)
    //expect(mycoleccion.tamColeccionBienes).toBe(2);
  });
  test("Añadir Cliente", () => {
    mycoleccion.añadirCliente(cliente2)
    //expect(mycoleccion.tamColeccionClientes).toBe(2);
  });
  test("Añadir Mercader", () => {
    mycoleccion.añadirMercader(mercader2)
    //expect(mycoleccion.tamColeccionMercaderes).toBe(2);
  });
  test("Eliminar Bien", () => {
    mycoleccion.eliminarBien(bien2)
    //expect(mycoleccion.tamColeccionBienes).toBe(1);
  });
  test("Eliminar Cliente", () => {
    mycoleccion.eliminarCliente(cliente2)
    //expect(mycoleccion.tamColeccionClientes).toBe(1);
  });
  test("Eliminar Mercader", () => {
    mycoleccion.eliminarMercader(mercader2)
    //expect(mycoleccion.tamColeccionMercaderes).toBe(1);
  });
  test("Consultar Bienes", () => {
    //expect(mycoleccion.consultarBien("Espada",)).toBe(1);
  });
});

