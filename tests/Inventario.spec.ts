import { describe, test,expect, beforeEach } from "vitest"
import { Bien } from "../src/Bien.ts"
import { Inventario } from "../src/Inventario.ts"
import { Mercader } from "../src/Mercader.ts";
import { Cliente } from "../src/Cliente.ts";

const bien1 = new Bien(1, "Espada", "Es una espada de plata", "Acero de Mahakam", 12, 1300);
const cliente1 = new Cliente(1,"Pepe","Velen","Humano");
const cliente2 = new Cliente(2,"Manolo","Kaer Trolde","enano");
const mercader1 = new Mercader(1, "Hattori","Novigrado", "Herrero");
const mercader2 = new Mercader(1234, "YoSoyPlex", "España" , "Alquimista");
const bien2 = new Bien(2, "Espada", "Es un elixir de Golondrina", "cuero endurecido", 7, 200);
const bien3 = new Bien(3, "Golondrina", "Es una espada de plata", "Acero de Mahakam", 12, 1300);
let mycoleccion;

beforeEach(() => {
  mycoleccion = new Inventario([bien1],[cliente1], [mercader1]);
});
describe("THE WITCHER - Probando clase Inventario", () => {
  test("Tamaño de la Colección Bienes", () => {
    expect(mycoleccion.tamColeccionBienes()).toBe(1);
  });
  test("Tamaño de la Colección Clientes", () => {
    expect(mycoleccion.tamColeccionClientes()).toBe(1);
  });
  test("Tamaño de la Colección Mercaderes", () => {
    expect(mycoleccion.tamColeccionMercaderes()).toBe(1);
  });
  test("Añadir Bien", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.tamColeccionBienes()).toBe(2);
  });
  test("Añadir Cliente", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.tamColeccionClientes()).toBe(2);
  });
  test("Añadir Mercader", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.tamColeccionMercaderes()).toBe(2);
  });
  test("Eliminar Bien", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.eliminarBien(bien2)).toBe("Se ha eliminado el bien correctamente");
  });
  test("Eliminar Bien que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarBien(bien2)).toBe(undefined);
  });
  test("Eliminar Cliente", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.eliminarCliente(cliente2)).toBe("Se ha eliminado el cliente correctamente");
  });
  test("Eliminar Cliente que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarCliente(cliente2)).toBe(undefined);
  });
  test("Eliminar Mercader", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.eliminarMercader(mercader2)).toBe("Se ha eliminado el mercader correctamente");
  });
  test("Eliminar Mercader que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarMercader(mercader2)).toBe(undefined);
  });
  test("Consultar Bienes asc por coronas", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.consultarBien("Espada","coronas","asc")).toEqual([1,2]);
  });
  test("Consultar Bien desc por coronas", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.consultarBien("Espada","coronas","desc")).toEqual([2,1]);
  });
  test("Consultar Bienes asc por nombre", () => {
    mycoleccion.añadirBien(bien2);
    mycoleccion.añadirBien(bien3);
    expect(mycoleccion.consultarBien("Acero de Mahakam","alfa","asc")).toEqual([3,1]);
  });
  test("Consultar Bien desc por nombre", () => {
    mycoleccion.añadirBien(bien2);
    mycoleccion.añadirBien(bien3);
    expect(mycoleccion.consultarBien("Acero de Mahakam","alfa","desc")).toEqual([1,3]);
  });
  test("Mostrar Bienes", () => {
    const infoExpected = `Bien: Espada, con ID 1\nDescripcion: Es una espada de plata\nMaterial: Acero de Mahakam\nPeso: 12\nValor: 1300 coronas`;
    const infoExpected2 = `Bien: Espada, con ID 2\nDescripcion: Es un elixir de Golondrina\nMaterial: cuero endurecido\nPeso: 7\nValor: 200 coronas`;
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.MostrarBienes()).toEqual([infoExpected, infoExpected2]);
  });
  test("Mostrar Clientes", () => {
    const infoExpected = `Cliente con ID 1 y nombre Pepe\nUbicacion: Velen,\nRaza del cliente: Humano`;
    const infoExpected2 = `Cliente con ID 2 y nombre Manolo\nUbicacion: Kaer Trolde,\nRaza del cliente: enano`;
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.MostrarClientes()).toEqual([infoExpected,infoExpected2]);
  });
  test("Mostrar Mercaderes", () => {
    const infoExpected = `Mercader con ID 1 y nombre Hattori\nUbicacion: Novigrado\nTipo: Herrero`;
    const infoExpected2 = `Mercader con ID 1234 y nombre YoSoyPlex\nUbicacion: España\nTipo: Alquimista`;
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.MostrarMercaderes()).toEqual([infoExpected, infoExpected2]);
  });
});

