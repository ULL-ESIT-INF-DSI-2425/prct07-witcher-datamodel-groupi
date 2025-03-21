import { describe, test,expect, beforeEach } from "vitest"
import { Transaccion } from "../src/Transaccion.ts"
let transaccion;
beforeEach(() => {
  transaccion = new Transaccion;
});
describe("THE WITCHER - Probando clase Transaccion", () => {
  test("Transacción de tipo venta", () => {
    transaccion.TransaccionVenta(1,[[20,1]],100);
    expect(transaccion.HistoricoTransacciones(1)[0]).toEqual({
      fecha: expect.any(Date),
      tipo: "venta",
      bienes: [[20,1]],
      totalCoronas: 100,
      idCliente: 1
    });
  });
  test("Transacción de tipo Compra", () => {
    transaccion.TransaccionCompra(2,[[21,2]],150);
    expect(transaccion.HistoricoTransacciones(2)[0]).toEqual({
      fecha: expect.any(Date),
      tipo: "compra",
      bienes: [[21,2]],
      totalCoronas: 150,
      idMercader: 2
    });
  });
  test("Transacción de tipo Devolución", () => {
    transaccion.TransaccionVenta(1,[[20,1]],100);
    transaccion.TransaccionDevolucion(0);
    expect(transaccion.HistoricoTransacciones(1)[1]).toEqual({
      fecha: expect.any(Date),
      tipo: "devolucion",
      bienes: [[20,1]],
      idMercader: undefined,
      totalCoronas: 0,
      idCliente: 1
    });
  });
  test("Calcular el total de los Ingresos", () => {
    transaccion.TransaccionVenta(1,[[20,1]],100);
    transaccion.TransaccionCompra(2,[[21,2]],150);
    expect(transaccion.TotalIngresos()).toEqual(250);
  });
  test("Historico Transacciones", () => {
    transaccion.TransaccionVenta(1,[[20,1]],100);
    transaccion.TransaccionVenta(1,[[40,1]],300);
    expect(transaccion.HistoricoTransacciones(1)).toEqual([{
      fecha: expect.any(Date),
      tipo: "venta",
      bienes: [[20,1]],
      totalCoronas: 100,
      idCliente: 1
    },{
      fecha: expect.any(Date),
      tipo: "venta",
      bienes: [[40,1]],
      totalCoronas: 300,
      idCliente: 1
    }]);
  });
});