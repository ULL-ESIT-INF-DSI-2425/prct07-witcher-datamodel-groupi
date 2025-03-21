import { describe, test,expect, beforeEach } from "vitest"
import { Mercader } from "../src/Mercader.ts";
import { GestorMercader } from "../src/GestorMercaderes.ts"
const mercader1 = new Mercader(1, "Hattori","Novigrado", "Herrero");
const mercader2 = new Mercader(1234, "YoSoyPlex", "España" , "Alquimista");
let mycoleccion;

beforeEach(() => {
  mycoleccion = new GestorMercader([mercader1]);
});
describe("THE WITCHER - Probando clase GestorMercader", () => {
  test("Tamaño de la Colección Mercaderes", () => {
    expect(mycoleccion.tamColeccionMercaderes()).toBe(1);
  });
  test("Añadir Mercader", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.tamColeccionMercaderes()).toBe(2);
  });
  test("Eliminar Mercader", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.eliminarMercader(mercader2)).toBe("Se ha eliminado el mercader correctamente");
  });
  test("Eliminar Mercader que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarMercader(mercader2)).toBe(undefined);
  });
  test("Mostrar Mercaderes", () => {
    const infoExpected = `Mercader con ID 1 y nombre Hattori\nUbicacion: Novigrado\nTipo: Herrero`;
    const infoExpected2 = `Mercader con ID 1234 y nombre YoSoyPlex\nUbicacion: España\nTipo: Alquimista`;
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.MostrarMercaderes()).toEqual([infoExpected, infoExpected2]);
  });
  test("Localizar Mercaderes por ubicación", () => {
    expect(mycoleccion.buscarUbicacion("Novigrado")).toEqual([{
      _ID: 1,
      _nombre: "Hattori",
      _tipo: "Herrero",
      _ubicacion: "Novigrado"
    }]);
  });
  test("Localizar Mercaderes por nombre", () => {
    expect(mycoleccion.buscarNombre("Hattori")).toEqual([{
      _ID: 1,
      _nombre: "Hattori",
      _tipo: "Herrero",
      _ubicacion: "Novigrado"
    }]);
  });
  test("Localizar Mercaderes por tipo", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.buscarTipo("Alquimista")).toEqual([{
      _ID: 1234,
      _nombre: "YoSoyPlex",
      _tipo: "Alquimista",
      _ubicacion: "España"
    }]);
  });
});

