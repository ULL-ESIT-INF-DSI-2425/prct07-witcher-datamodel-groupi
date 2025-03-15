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

  test("Setter del tipo", () => {
    mercader.tipo =  "Alquimista";
    expect(mercader.tipo).toBe("Alquimista");
  });

  test("Pruebas del metodo print", () => {
    const info = mercader.print();
    expect(info).toBe(`Mercader con ID 1234 y nombre YoSoyPlex\nUbicacion: España\nTipo: Alquimista`);
  });
});