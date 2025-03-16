/**
 * Clase para representar a los personajes
 */
export abstract class Personaje {
  /**
   * Constructor de la clase personaje
   * @param _ID - ID que representa al personaje
   * @param _nombre - Nombre del personaje
   * @param _ubicacion - Ubicacion a la que pertenece el personaje
   */
  constructor(protected _ID: number, protected _nombre: string, protected _ubicacion: string) {
  }
  /**
   * Metodo para obtener el ID del personaje
   */
  get ID(): number {
    return this._ID;
  }
  /**
   * Metodo para asignar un nuevo ID a un personaje
   * @param nuevoID - ID que se pretende asignar al personaje
   */
  set ID(nuevoID: number) {
    this._ID = nuevoID;
  }
  /**
   * Metodo para obtener el nombre de un personaje
   */
  get nombre() {
    return this._nombre;
  }
  /**
   * Metodo para asignar un nuevo nombre al personaje
   * @param nuevoNombre - nombre que se pretende asignar al personaje
   */
  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }
  /**
   * Metodo para obtener la ubicacion donde reside el personaje
   */
  get ubicacion() {
    return this._ubicacion;
  }
  /**
   * Metodo para asignar una nueva ubicacion a un personaje
   * @param nuevaUbicacion - nueva ubicacion que se pretende asignar al personaje
   */
  set ubicacion(nuevaUbicacion: string) {
    this._ubicacion = nuevaUbicacion;
  }
}