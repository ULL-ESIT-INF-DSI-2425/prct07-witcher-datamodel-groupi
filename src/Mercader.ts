import { Personaje } from "./Personaje.ts";

type tipoMercader = " Herrero" | "alquimista" | "mercader general";

export class Mercader extends Personaje {
  protected _tipo: tipoMercader;
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string, tipo: tipoMercader) {
    super(_ID,_nombre,_ubicacion);
    this._tipo = tipo;
  }
  /**
   * Getter del tipo del mercader
   */
  get tipo() {
    return this._tipo;
  }
  /**
   * Setter del tipo del mercador
   * @param nuevo_tipo 
   */
  set tipo(nuevo_tipo: tipoMercader) {
    this._tipo = nuevo_tipo;
  }
}