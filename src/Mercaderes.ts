import { Personajes } from "./Personajes";
type tipoMercader = " Herrero" | "alquimista" | "mercader general";
export class Mercaderes extends Personajes {
  protected _tipo: tipoMercader;
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string, tipo: tipoMercader) {
    super(_ID,_nombre,_ubicacion);
    this._tipo = tipo;
  }
  get tipo() {
    return this._tipo;
  }
  set tipo(nuevo_tipo: tipoMercader) {
    this._tipo = nuevo_tipo;
  }
}