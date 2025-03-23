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
  test("Localizar información de un mercader", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.buscarID(1234)).toEqual({
      _ID: 1234,
      _nombre: "YoSoyPlex",
      _tipo: "Alquimista",
      _ubicacion: "España"
    });
  });
  test("Localizar información de un mercader cuyo ID no existe", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.buscarID(12345)).toEqual(undefined);
  });
  test("Busca todos los ID", () => {
    mycoleccion.añadirMercader(mercader2);
    expect(mycoleccion.getIDs()).toEqual([1,1234]);
  });
  test("Modificar nombre", () => {
    const result = mycoleccion.modificarNombre(1, "Ramon");
    expect(result).toBe(true);
  });
  test("Modificar nombre con ID que no existe", () => {
    const result = mycoleccion.modificarNombre(1000, "Ramon");
    expect(result).toBe(false);
  });
  test("Modificar tipo", () => {
    const result = mycoleccion.modificarTipo(1, "Alquimista");
    expect(result).toBe(true);
  });
  test("Modificar tipo con ID que no existe", () => {
    const result = mycoleccion.modificarTipo(1000, "Alquimista");
    expect(result).toBe(false);
  });
  test("Modificar ubicacion", () => {
    const result = mycoleccion.modificarUbicacion(1, "Velen");
    expect(result).toBe(true);
  });
  test("Modificar ubicacion con ID que no existe", () => {
    const result = mycoleccion.modificarUbicacion(1000, "Velen");
    expect(result).toBe(false);
  });
  test("Comprobar modificaciones", () => {
    expect(mycoleccion.buscarID(1)).toEqual({
      _ID: 1,
      _nombre: "Ramon",
      _tipo: "Alquimista",
      _ubicacion: "Velen"
    });
  });
  let gestor: GestorMercader;
  beforeEach(() => {
    // Crear mercaderes desordenados por ID
    const mercaderes = [
      new Mercader(5, "Pedro", "Madrid", "Herrero"),
      new Mercader(2, "Lucas", "Barcelona", "Herrero"),
      new Mercader(3, "Elena", "Valencia", "Herrero"),
    ];
    gestor = new GestorMercader(mercaderes);
  });
  test("Comprobar ordenar mercaderes por ID", () => {
    gestor.ordenarID(); // Ejecutar ordenación
    const idsOrdenados = gestor.getIDs();
    expect(idsOrdenados).toEqual([2, 3, 5]); // IDs deben estar ordenados
  });
});

