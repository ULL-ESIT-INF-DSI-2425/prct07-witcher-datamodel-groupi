import { Bien } from "./Bien.ts"
import { Mercader } from "./Mercader.ts"
import { Cliente } from "./Cliente.ts"

export type tipoTransaccion = "venta" | "compra" | "devolucion"

export class Transaccion {
  private _tipo: tipoTransaccion;
  private _fecha: string;
  private _bienes_disponibles: [id_bien: number, cantidad: number][] = [];
  private _totalCoronas: number;
  private readonly _id_mercader : number;
  private readonly _id_cliente : number;
  private readonly _id_bien : number;
  constructor(id_mer : number, id_cl : number, id_bi : number, type : tipoTransaccion, date : string,precio : number) {
    this._id_mercader = id_mer;
    this._id_cliente = id_cl;
    this._id_bien = id_bi;
    this._tipo = type;
    this._fecha = date;
    this._totalCoronas = precio;
  }
  get totalCoronas() : number{
    return this._totalCoronas;
  }
  get tipo() : tipoTransaccion {
    return this._tipo;
  }
  get fecha() : string {
    return this._fecha;
  }
  get id_mercader() : number {
    return this._id_mercader;
  }
  get id_cliente() : number {
    return this._id_cliente;
  }
  get bienes() : [id_bien: number, cantidad: number][] {
    return this._bienes_disponibles;
  }
}