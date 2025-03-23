import { Mercader, tipoMercader } from "./Mercader.js";
/**
 * Clase para representar la colleción de Mercaderes
 */
export class GestorMercader {
  private _coleccionMercaderes : Mercader[];
  /**
   * Constructor de la clase GestorMercader
   * @param coleccionMercaderes - array en el que se almacenan los mercaderes
   */
  constructor(coleccionMercaderes: Mercader[] = []) {
    this._coleccionMercaderes = coleccionMercaderes;
  }
  /**
   * Getter de la coleccion de mercaderes
   */
  get coleccionMercaderes() : Mercader[] {
    return this._coleccionMercaderes;
  }
  /**
   * Método que retorna el tamaño de la colección de Mercaderes
   * @returns tamaño de la colección
   */
  tamColeccionMercaderes(): number {
    return this.coleccionMercaderes.length;
  }
  /**
   * Metodo para añadir un nuevo mercader a la coleccion
   * @param nuevoMercader - mercader que se pretende añadir
   */
  añadirMercader(nuevoMercader: Mercader): void {
    this.coleccionMercaderes.push(nuevoMercader);
  }
  /**
   * Metodo para eliminar un mercader de la coleccion
   * @param item - mercader que se pretende eliminar
   */
  eliminarMercader(item: Mercader): string | undefined {
    let indice = -1;
    indice = this.coleccionMercaderes.indexOf(item);
    if (indice != -1) {
      this.coleccionMercaderes.splice(indice,1);
      return "Se ha eliminado el mercader correctamente"
    } 
    return undefined;
  }
  /**
   * Metodo para listar los mercaderes
   */
  MostrarMercaderes(): string[] {
    return this.coleccionMercaderes.map(item => item.print());
  }
  /**
   * Método para localizar a mercaderes por su nombre
   * @param nombre - nombre del mercader
   * @returns lista de mercaderes con ese nombre
   */
  buscarNombre(nombre: string): Mercader[] {
    return this.coleccionMercaderes.filter(mercader => mercader.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }
  /**
   * Método para localizar a mercaderes por su tipo
   * @param tipo - tipo de mercader
   * @returns lista de mercaderes con ese tipo
   */
  buscarTipo(tipo: tipoMercader): Mercader[] {
    return this.coleccionMercaderes.filter(mercader => mercader.tipo === tipo);
  }
  /**
   * Método para localizar a mercaderes por su ubicación
   * @param ubicacion - ubicación del mercader
   * @returns lista de mercaderes con esa ubicación
   */
  buscarUbicacion(ubicacion: string): Mercader[] {
    return this.coleccionMercaderes.filter(mercader => mercader.ubicacion === ubicacion);
  }
  /**
   * Método para localizar un ID
   * @param id - Identificador 
   * @returns Información del mercader
   */
  buscarID(id : number) : Mercader | undefined {
    return this.coleccionMercaderes.find(mercader => mercader.ID === id);
  }
  /**
   * Obtener IDs de la colección
   * @returns IDs de la colección
   */
  getIDs(): number[] {
    return this._coleccionMercaderes.map(mercader => mercader.ID);
  }
  /**
   * Modificar tipo del mercader
   * @param id - Identificador
   * @param nuevoTipo - nuevo valor del tipo
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarTipo(id: number, nuevoTipo: tipoMercader): boolean {
    const mercader = this.buscarID(id);
    if (!mercader) {
      return false;
    } 
    mercader.tipo = nuevoTipo;
    return true;
  }
  /**
   * Modificar el nombre del mercader
   * @param id - Identificador
   * @param nuevoNombre - nuevo valor del nombre
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarNombre(id: number, nuevoNombre: string): boolean {
    const mercader = this.buscarID(id);
    if (!mercader) {
      return false;
    } 
    mercader.nombre = nuevoNombre;
    return true;
  }
  /**
   * Modificar ubicación del mercader
   * @param id - Identificador
   * @param nuevaUbicacion - nuevo valor de la ubicación
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarUbicacion(id: number, nuevaUbicacion: string): boolean {
    const mercader = this.buscarID(id);
    if (!mercader) {
      return false;
    } 
    mercader.ubicacion = nuevaUbicacion;
    return true;
  }
}