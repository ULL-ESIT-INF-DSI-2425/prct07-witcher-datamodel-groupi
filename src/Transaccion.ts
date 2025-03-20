import { Bien } from "./Bien.ts"
import { Mercader } from "./Mercader.ts"
import { Cliente } from "./Cliente.ts"

export type tipoTransaccion = "venta" | "compra" | "devolucion"

export class Transaccion {
  private tipo: tipoTransaccion;
  private fecha: string;
  private bienes_disponibles: [bien: Bien, cantidad: number][] = [];
  private totalCoronas: number;
  private readonly id_mercader : number;
  private readonly id_cliente : number;
  private readonly id_bien : number;
  constructor(id_mer : number, id_cl : number, id_bi : number, type : tipoTransaccion, date : string,precio : number) {
    this.id_mercader = id_mer;
    this.id_cliente = id_cl;
    this.id_bien = id_bi;
    this.tipo = type;
    this.fecha = date;
    this.totalCoronas = precio;
  }
}