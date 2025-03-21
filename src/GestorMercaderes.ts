import { Mercader, tipoMercader } from "./Mercader.ts";
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
}