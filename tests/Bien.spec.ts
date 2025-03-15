import { describe, test, expect } from "vitest"
import { Bien } from "../src/Bien.ts"

const bien1 = new Bien(1, "Espada", "Es una espada de plata", "Acero de Mahakam", 12, 1300);

describe("THE WITCHER - Probando clase Bien", () => {
  test("Getter del ID", () => {
    expect(bien1.ID).toBe(1);
  });
  test("Getter del nombre", () => {
    expect(bien1.nombre).toBe("Espada");
  });
  test("Getter de la descripcion", () => {
    expect(bien1.descripcion).toBe("Es una espada de plata");
  });
  test("Getter del material", () => {  
    expect(bien1.material).toBe("Acero de Mahakam");
  });
  test("Getter del peso", () => {    
    expect(bien1.peso).toBe(12);
  });
  test("Getter del valor en coronas", () => {
    expect(bien1.valorEnCoronas).toBe(1300);
  })

  // SETTERS
  test("Probar setters del ID del bien", () => {
    bien1.ID = 3;
    expect(bien1.ID).toBe(3);
  });
  test("Probar setters del nombre del  bien", () => {
    bien1.nombre = "Funda Espada de Hierro";
    expect(bien1.nombre).toBe("Funda Espada de Hierro");
  });
  test("Probar setters de la descripcion del bien", () => {
    bien1.descripcion = "Una funda de espada de cuero";
    expect(bien1.descripcion).toBe("Una funda de espada de cuero");
  });
  test("Probar setters del material del bien", () => {
    bien1.material = "cuero endurecido";
    expect(bien1.material).toBe("cuero endurecido");
  });
  test("Probar setters del peso del bien", () => {
    bien1.peso = 10;
    expect(bien1.peso).toBe(10);
  });
  test("Probar setters del valor en coronas del bien", () => {
    bien1.valorEnCoronas = 800;
    expect(bien1.valorEnCoronas).toBe(800);
  });
});
