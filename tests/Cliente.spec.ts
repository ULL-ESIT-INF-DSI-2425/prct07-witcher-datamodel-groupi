import { describe, test, expect } from "vitest"
import { Cliente } from "../src/Cliente"

const cliente = new Cliente(24, "Estelita", "C/ Mojica", "elfo")

describe("THE WITCHER - Probando Clase Cliente", ()=> {
  test("Prueba getter del ID del cliente", ()=> {
    expect(cliente.ID).toBe(24);
  });
  test("Prueba getter del ")
});