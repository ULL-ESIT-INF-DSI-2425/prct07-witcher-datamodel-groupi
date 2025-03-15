export abstract class Personaje {
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string) {
  }
  get ID(): number {
    return this._ID;
  }
  set ID(nuevoID: number) {
    this._ID = nuevoID;
  }
  get nombre() {
    return this._nombre;
  }
  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }
  get ubicacion() {
    return this._ubicacion;
  }
  set ubicacion(nuevaUbicacion: string) {
    this._ubicacion = nuevaUbicacion;
  }
  
}