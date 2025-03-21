import { Personaje } from "./Personaje.ts";

export type razaCliente = "Humano" | "elfo" | "enano" | "hechicero";

/**
 * Clase para representar los clientes
 */
export class Cliente extends Personaje {
  protected _raza: razaCliente;
  /**
   * Constructor de la clase cliente
   * @param _ID - id del cliente
   * @param _nombre - nombre del cliente
   * @param _ubicacion - ubicacion del cliente
   * @param raza - raza del cliente
   */
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string, raza: razaCliente) {
    super(_ID,_nombre,_ubicacion);
    this._raza = raza;
  }
  /**
   * Metodo para obtener la raza del cliente
   */
  get raza() {
    return this._raza;
  }
  /**
   * Metodo para asignar la raza a un cliente
   */
  set raza(nuevo_raza: razaCliente) {
    this._raza = nuevo_raza;
  }
  /**
   * Metodo para imprimir la informacion del cliente
   */
  print(): string {
    return `Cliente con ID ${this.ID} y nombre ${this._nombre}\nUbicacion: ${this._ubicacion},\nRaza del cliente: ${this.raza}`;
  }
}