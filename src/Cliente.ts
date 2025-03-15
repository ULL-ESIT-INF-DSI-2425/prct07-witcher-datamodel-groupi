import { Personaje } from "./Personaje.ts";

type razaCliente = "Humano" | "elfo" | "enano" | "hechicero";

export class Cliente extends Personaje {
  protected _raza: razaCliente;
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string, raza: razaCliente) {
    super(_ID,_nombre,_ubicacion);
    this._raza = raza;
  }
  get raza() {
    return this._raza;
  }
  set raza(nuevo_raza: razaCliente) {
    this._raza = nuevo_raza;
  }
}