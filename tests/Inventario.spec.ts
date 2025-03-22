import { describe, test,expect, beforeEach } from "vitest"
import { Bien } from "../src/Bien.ts"
import { Inventario } from "../src/Inventario.ts"

const bien1 = new Bien(1, "Espada", "Es una espada de plata", "Acero de Mahakam", 12, 1300);
const bien2 = new Bien(2, "Espada", "Es un elixir de Golondrina", "cuero endurecido", 7, 200);
const bien3 = new Bien(3, "Golondrina", "Es una espada de plata", "Acero de Mahakam", 12, 1300);
let mycoleccion;

beforeEach(() => {
  mycoleccion = new Inventario([bien1]);
});
describe("THE WITCHER - Probando clase Inventario", () => {
  test("Tamaño de la Colección Bienes", () => {
    expect(mycoleccion.tamColeccionBienes()).toBe(1);
  });
  test("Añadir Bien", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.tamColeccionBienes()).toBe(2);
  });
  test("Eliminar Bien", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.eliminarBien(bien2)).toBe("Se ha eliminado el bien correctamente");
  });
  test("Eliminar Bien que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarBien(bien2)).toBe(undefined);
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
  test("Localizar información de un bien", () => {
    expect(mycoleccion.buscarID(1)).toEqual({
      "_ID": 1,
      "_descripcion": "Es una espada de plata",
      "_material": "Acero de Mahakam",
      "_nombre": "Espada",
      "_peso": 12,
      "_valorEnCoronas": 1300,
    });
  });
  test("Busca todos los ID", () => {
    mycoleccion.añadirBien(bien2);
    expect(mycoleccion.getIDs()).toEqual([1,2]);
  });
  test("Modificar nombre", () => {
    const result = mycoleccion.modificarNombre(1, "Espada de cuero");
    expect(result).toBe(true);
  });
  test("Modificar material", () => {
    const result = mycoleccion.modificarMaterial(1, "cuero endurecido");
    expect(result).toBe(true);
  });
  test("Modificar descripcion", () => {
    const result = mycoleccion.modificarDescripcion(1, "Es una espada que es de plata y de cuero endurecido");
    expect(result).toBe(true);
  });
  test("Modificar peso", () => {
    const result = mycoleccion.modificarPeso(1,1);
    expect(result).toBe(true);
  });
  test("Modificar valor en Coronas", () => {
    const result = mycoleccion.modificarValorCoronas(1, 3);
    expect(result).toBe(true);
  });
  test("Comprobar modificaciones", () => {
    expect(mycoleccion.buscarID(1)).toEqual({
      "_ID": 1,
      "_descripcion": "Es una espada que es de plata y de cuero endurecido",
      "_material": "cuero endurecido",
      "_nombre": "Espada de cuero",
      "_peso": 1,
      "_valorEnCoronas": 3,
    });
  });
});

