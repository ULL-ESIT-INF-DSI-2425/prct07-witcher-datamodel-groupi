import { describe, test, expect } from "vitest"
import { Cliente } from "../src/Cliente"

const cliente = new Cliente(24, "Estelita", "C/ Mojica", "Elfo")

describe("THE WITCHER - Probando Clase Cliente", ()=> {
  test("Prueba getter del ID del cliente", ()=> {
    expect(cliente.ID).toBe(24);
  });

  test("Prueba getter del nombre del cliente", () => {
    expect(cliente.nombre).toBe("Estelita");
  });
  
  test("Prueba getter de la ubicacion del cliente", () => {
    expect(cliente.ubicacion).toBe("C/ Mojica");
  })
  
  test("Prueba getter de del raza", () =>{
    expect(cliente.raza).toBe("Elfo")
  });

  test("Setter de la raza", () => {
    cliente.raza =  "Humano";
    expect(cliente.raza).toBe("Humano");
  });

  test("Setter del ID", () => {
    cliente.ID = 1212;
    expect(cliente.ID).toBe(1212);
  });

  test("Setter de la ubicacion", () => {
    cliente.ubicacion = "Tacoronte";
    expect(cliente.ubicacion).toBe("Tacoronte");
  });

  test("Setter del nombre", () => {
    cliente.nombre = "Plex";
    expect(cliente.nombre).toBe("Plex");
  });
});