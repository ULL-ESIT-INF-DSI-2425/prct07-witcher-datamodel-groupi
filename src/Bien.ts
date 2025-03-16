type materialBienes = "Acero de Mahakam" | "cuero endurecido" | "esencia mágica" | "mutágenos de bestias antiguas";
/**
 * Clase para representar los bienes
 */
export class Bien {
  /**
   * Constructor de la clase bien
   * @param _ID - identificador del bien
   * @param _nombre - nombre del bien
   * @param _descripcion - pequeña descripcion del bien 
   * @param _material - material del que está hecho el bien
   * @param _peso - peso del bien
   * @param _valorEnCoronas - valor del bien representado en coronas
   */
  constructor(private _ID: number, private _nombre: string, private _descripcion: string, private _material: materialBienes, private _peso: number, private _valorEnCoronas: number) {}   
  /**
   * Metodo para obtener el ID del bien
   */
  get ID(): number {
    return this._ID;
  }
  /**
   * Setter del id de un bien
   */
  set ID(id : number) {
    if (id > 0) {
      this._ID = id;
    } else {
      console.error("ID debe ser un valor positivo.");
    }
  }
  /**
   * Getter para obtener el nombre del bien
   */
  get nombre(): string {
    return this._nombre;
  }
  /**
   * Setter para asignar el nombre a un bien
   * @param nuevoNombre - nuevo nombre que se pretende asignar al bien
   */
  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }
  /**
   * Getter para obtener la descripcion del bien
   */
  get descripcion(): string {
    return this._descripcion;
  }
  /**
   * Setter para asignar el nombre a un bien
   * @param nuevaDescripcion - descripcion que se pretende asignar al bien
   */
  set descripcion(nuevaDescripcion: string) {
    this._descripcion = nuevaDescripcion;
  }
  /**
   * Getter para obtener el material del bien
   */
  get material(): materialBienes {
    return this._material;
  }
  /**
   * Setter para asignar el nombre a un bien
   * @param nuevoMaterial - material que se pretende asignar al bien
   */
  set material(nuevoMaterial: materialBienes) {
    this._material = nuevoMaterial;
  }
  /**
   * Getter para obtener el peso del bien
   */
  get peso(): number {
    return this._peso;
  }
  /**
   * Setter para asignar el nombre a un bien
   * @param nuevoPeso - peso que se pretende asignar al bien
   */
  set peso(nuevoPeso: number) {
    this._peso = nuevoPeso;
  }
  /**
   * Getter para obtener el valorEnCoronas del bien
   */
  get valorEnCoronas(): number {
    return this._valorEnCoronas;
  }
  /**
   * Setter para asignar el nombre a un bien
   * @param nuevoValor - nuevo valor que se pretende asignar al bien
   */
  set valorEnCoronas(nuevoValor: number) {
    this._valorEnCoronas = nuevoValor;
  }
  /**
   * Metodo para imprimir la informacion de un bien
   */
  print() : string {
    return `Bien: ${this._nombre}, con ID ${this._ID}\nDescripcion: ${this._descripcion}\nMaterial: ${this._material}\nPeso: ${this._peso}\nValor: ${this._valorEnCoronas} coronas`;
  }
}