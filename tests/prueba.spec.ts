import {describe, test, expect, beforeEach } from "vitest"
import {Suma} from "../src/prueba"
import {Bienes} from "../src/Bienes"
import {Mercaderes} from "../src/Mercaderes"
import {Clientes} from "../src/Clientes"

/*describe("Pruebas The Witcher", ()=> {
  let bien1, bien2, bien3, bien4, bien5, bien6, bien7, bien8, bien9, bien10, ;
  beforeEach(() => {
  });
})*/

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
