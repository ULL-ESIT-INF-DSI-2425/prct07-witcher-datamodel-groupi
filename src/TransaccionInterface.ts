import { Bien } from "./Bien.ts"
import { Mercader } from "./Mercader.ts"
import { Cliente } from "./Cliente.ts"

export type tipoTransaccion = "venta" | "compra" | "devolucion"

export interface Transaccion {
  tipo: tipoTransaccion;
  fecha: string;
  bienes: {bien: Bien; cantidad: number}[];
  totalCoronas: number;
  usuario: Mercader | Cliente;
}