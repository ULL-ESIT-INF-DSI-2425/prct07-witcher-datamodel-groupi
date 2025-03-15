import { describe, test, expect } from "vitest"
import { Mercader } from "../src/Mercader"

const mercader = new Mercader(1234, "YoSoyPlex", "España" , "Herrero");

describe("Pruebas de la clase Mercader", () => {
  test("Prueba de creacion de objeto", () => {
    expect(mercader).toBeInstanceOf(Mercader);
  });

  test("Getter del tipo", () => {
    expect(mercader.tipo).toBe("Herrero");
  });

  test("Getter del ID del mercader", () => {
    expect(mercader.ID).toBe(1234);
  })

  test("Getter del nombre del mercader", () => {
    expect(mercader.nombre).toBe("YoSoyPlex");
  });

  test("Getter de la ubicacion", () => {
    expect(mercader.ubicacion).toBe("España");
  });

  test("Setter del tipo", () => {
    mercader.tipo =  "Alquimista";
    expect(mercader.tipo).toBe("Alquimista");
  });

  test("Pruebas del metodo print", () => {
    const info = mercader.print();
    const expectInfo = `Mercader con ID 1234 y nombre YoSoyPlex\nUbicacion: España\nTipo: Alquimista`;
    expect(info).toBe(expectInfo);
  });

  test("Setter del ID", () => {
    mercader.ID = 1212;
    expect(mercader.ID).toBe(1212);
  });

  test("Setter de la ubicacion", () => {
    mercader.ubicacion = "Tacoronte";
    expect(mercader.ubicacion).toBe("Tacoronte");
  });

  test("Setter del nombre", () => {
    mercader.nombre = "Plex";
    expect(mercader.nombre).toBe("Plex");
  });
});