import { Bien } from "./Bien.ts";

type modoOrdenar = "alfa" | "coronas";
type orden = "asc" | "desc";
/**
 * Clase para representar el inventario
 */
export class Inventario  {
  private _coleccionBienes : Bien[];
  /**
   * Constructor de la clase Inventario 
   * @param coleccionBienes - array en el que se almacenan los bienes 
  **/
  constructor(coleccionBienes: Bien[]) {
    this._coleccionBienes = coleccionBienes;
  }
  /**
   * Getter de la coleccion de bienes
   */
  get coleccionBienes() : Bien [] {
    return this._coleccionBienes;
  } 
  /**
   * Metodo que permite añadir un Bien a la colecciones de bienes.
   * @param nuevoBien  - bien que se pretende añadir a la coleccion
   */
  añadirBien(nuevoBien: Bien): void {
    this._coleccionBienes.push(nuevoBien);
  }
  /**
   * Metodo que permite eliminar un bien de la coleccion de bienes
   * @param item - bien que se pretende eliminar
   */
  eliminarBien(item: Bien): string | undefined {
    let indice = -1;
    indice = this._coleccionBienes.indexOf(item);
    if (indice != -1) {
      this._coleccionBienes.splice(indice,1);
      return "Se ha eliminado el bien correctamente"
    } 
    return undefined;
  }
  /**
   * Método que retorna el tamaño de la colección de Bienes
   * @returns tamaño de la colección
   */
  tamColeccionBienes(): number {
    return this._coleccionBienes.length;
  }
  /**
   * Metodo para listar los bienes
   */
  MostrarBienes(): string[] {
    return this._coleccionBienes.map(item => item.print());
  }
  /**
   * Metodo para buscar un bien en la coleccion de bienes
   * @param item - item que puede ser el nombre, tipo o descripción de los bienes
   * @param formato - alfabéticamente o por valor en coronas
   * @param ordenElegido - orden ascendente o descendente
   * @returns información de los bienes específico
   */
  consultarBien(item: string, formato: modoOrdenar, ordenElegido: orden ): number[]  {
   return this._coleccionBienes.filter(nuevo => 
      nuevo.nombre.toLowerCase().includes(item.toLowerCase()) ||
      nuevo.material.toLowerCase().includes(item.toLowerCase()) ||
      nuevo.descripcion.toLowerCase().includes(item.toLowerCase())
    ).sort((item1, item2) => {
      const valorItem1 = formato === "alfa" ? item1.nombre : item1.valorEnCoronas;
      const valorItem2 = formato === "alfa" ? item2.nombre : item2.valorEnCoronas;
      if (valorItem1 > valorItem2) {
        return ordenElegido === "asc" ? -1 : 1;
      } else {
        return ordenElegido === "asc" ? 1 : -1;
      }
    }).map(bien => bien.ID)
  }
}