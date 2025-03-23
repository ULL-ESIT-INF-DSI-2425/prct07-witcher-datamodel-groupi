import { describe, test,expect, beforeEach } from "vitest"
import { GestorCliente } from "../src/GestorClientes.ts";
import { Cliente } from "../src/Cliente.ts";
const cliente1 = new Cliente(1,"Pepe","Velen","Humano");
const cliente2 = new Cliente(2,"Manolo","Kaer Trolde","Enano");
let mycoleccion;
beforeEach(() => {
  mycoleccion = new GestorCliente([cliente1]);
});
describe("THE WITCHER - Probando clase GestorCliente", () => {
  test("Tamaño de la Colección Clientes", () => {
    expect(mycoleccion.tamColeccionClientes()).toBe(1);
  });
  test("Añadir Cliente", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.tamColeccionClientes()).toBe(2);
  });
  test("Eliminar Cliente", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.eliminarCliente(cliente2)).toBe("Se ha eliminado el cliente correctamente");
  });
  test("Eliminar Cliente que no pertenece a la colección", () => {
    expect(mycoleccion.eliminarCliente(cliente2)).toBe(undefined);
  });
  test("Mostrar Clientes", () => {
    const infoExpected = `Cliente con ID 1 y nombre Pepe\nUbicacion: Velen,\nRaza del cliente: Humano`;
    const infoExpected2 = `Cliente con ID 2 y nombre Manolo\nUbicacion: Kaer Trolde,\nRaza del cliente: Enano`;
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.MostrarClientes()).toEqual([infoExpected,infoExpected2]);
  });
  test("Localizar Clientes por ubicación", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.buscarUbicacion("Kaer Trolde")).toEqual([{
      _ID: 2,
      _nombre: "Manolo",
      _raza: "Enano",
      _ubicacion: "Kaer Trolde"
    }]);
  });
  test("Localizar Clientes por nombre", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.buscarNombre("Manolo")).toEqual([{
      _ID: 2,
      _nombre: "Manolo",
      _raza: "Enano",
      _ubicacion: "Kaer Trolde"
    }]);
  });
  test("Localizar Clientes por raza", () => {
    expect(mycoleccion.buscarRaza("Humano")).toEqual([{
      _ID: 1,
      _nombre: "Pepe",
      _raza: "Humano",
      _ubicacion: "Velen"
    }]);
  });
  test("Localizar un cliente en concreto", () => {
    expect(mycoleccion.buscarID(1)).toEqual({
      _ID: 1,
      _nombre: "Pepe",
      _raza: "Humano",
      _ubicacion: "Velen"
    });
  });
  test("Busca todos los ID", () => {
    mycoleccion.añadirCliente(cliente2);
    expect(mycoleccion.getIDs()).toEqual([1,2]);
  });
  test("Modificar nombre", () => {
    const result = mycoleccion.modificarNombre(1, "Felipe");
    expect(result).toBe(true);
  });
  test("Modificar nombre sobre un ID que no existe", () => {
    const result = mycoleccion.modificarNombre(1000, "Felipe");
    expect(result).toBe(false);
  });
  test("Modificar raza", () => {
    const result = mycoleccion.modificarRaza(1, "Elfo");
    expect(result).toBe(true);
  });
  test("Modificar raza sobre un ID que no existe", () => {
    const result = mycoleccion.modificarRaza(1000, "Elfo");
    expect(result).toBe(false);
  });
  test("Modificar ubicacion", () => {
    const result = mycoleccion.modificarUbicacion(1, "Novigrado");
    expect(result).toBe(true);
  });
  test("Modificar ubicacion sobre un ID que no existe", () => {
    const result = mycoleccion.modificarUbicacion(1000, "Novigrado");
    expect(result).toBe(false);
  });
  test("Comprobar modificaciones", () => {
    expect(mycoleccion.buscarID(1)).toEqual({
      _ID: 1,
      _nombre: "Felipe",
      _raza: "Elfo",
      _ubicacion: "Novigrado"
    });
  });

  let gestor: GestorCliente;
    beforeEach(() => {
      // Crear clientes desordenados por ID
      const clientes = [
        new Cliente(3, "Carlos", "Madrid", "Humano"),
        new Cliente(1, "Ana", "Barcelona", "Elfo"),
        new Cliente(2, "Beatriz", "Valencia", "Enano"),
      ];
      gestor = new GestorCliente(clientes);
    });
  test("Comrpobar ordenar clientes por ID", () => {
    gestor.ordenarID();
    const idsOrdenados = gestor.getIDs();
    expect(idsOrdenados).toEqual([1, 2, 3]); // IDs deben estar ordenados
  });
  test("ordenarPorID debe mantener la cantidad de clientes", () => {
    const cantidadAntes = gestor.tamColeccionClientes();
    gestor.ordenarID();
    const cantidadDespues = gestor.tamColeccionClientes();
    
    expect(cantidadAntes).toBe(cantidadDespues); // No debe perder clientes
  });
});