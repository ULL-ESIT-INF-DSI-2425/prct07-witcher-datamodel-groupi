import { Personaje } from "./Personaje.ts";

export type tipoMercader = "Herrero" | "Alquimista" | "Mercader general";

/**
 * Clase para representar un mercader
 */
export class Mercader extends Personaje {
  protected _tipo: tipoMercader;
  /**
   * Constructor de la clase
   * @param _ID - id del mercader
   * @param _nombre - nombre del mercader
   * @param _ubicacion - ubicacion de la que proviene el mercader
   * @param tipo - tipo de mercader
   */
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string, tipo: tipoMercader) {
    super(_ID,_nombre,_ubicacion);
    this._tipo = tipo;
  }
  /**
   * Getter para obtener el tipo del mercader
   */
  get tipo() {
    return this._tipo;
  }
  /**
   * Setter del tipo del mercador
   * @param nuevo_tipo - nuevo tipo que se pretende asignar al mercader
   */
  set tipo(nuevo_tipo: tipoMercader) {
    this._tipo = nuevo_tipo;
  }
  /**
   * Metodo para imprimir la informacion del Mercader
   */
  print(): string {
    return `Mercader con ID ${this._ID} y nombre ${this._nombre}\nUbicacion: ${this._ubicacion}\nTipo: ${this.tipo}`;
  }
}