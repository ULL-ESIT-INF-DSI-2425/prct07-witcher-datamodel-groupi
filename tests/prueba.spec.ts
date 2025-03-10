// Para que comprobar cosas
import {describe, test, expect} from "vitest"
import {Suma} from "../src/prueba"

describe("Para comprobar si coveralls y CI funciona", ()=> {
  test("Funcion suma", ()=> {
    expect(Suma(1,2)).toBe(3);
  })
  test("Funcion suma", ()=> {
    expect(Suma(2,2)).toBe(4);
  })
  test("Funcion suma", ()=> {
    expect(Suma(76,2)).toBe(78);
  })
})