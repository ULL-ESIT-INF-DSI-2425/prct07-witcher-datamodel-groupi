import { Bien } from "./Bien.ts";
import { Cliente } from "./Cliente.ts";
import { Mercader } from "./Mercader.ts";
import { Transaccion, tipoTransaccion } from "./TransaccionInterface.ts";

type modoOrdenar = "alfa" | "coronas";
type orden = "asc" | "desc";
/**
 * Clase para representar el inventario
 */
export class Inventario implements Transaccion {
  tipo: tipoTransaccion = "venta";
  fecha: string = "";
  bienes: {bien: Bien; cantidad: number}[] = [];
  totalCoronas: number = 0;
  usuario: Mercader | Cliente = new Cliente(1234, "Pepe", "Casa", "Humano");
  /**
   * Constructor de la clase Inventario 
   * @param coleccionBienes - array en el que se almacenan los bienes 
   * @param coleccionMercaderes - array para almacenar los Mercaderes
   * @param coleccionClientes - array para almacenar los clientes que han realizado transacciones
  */
  constructor(private coleccionBienes: Bien[], private coleccionClientes: Cliente[], private coleccionMercaderes: Mercader[]) {
    coleccionBienes = [];
    coleccionClientes = [];
    coleccionMercaderes = [];
  }
  /**
   * Metodo que permite añadir un Bien a la colecciones de bienes.
   * @param nuevoBien  - bien que se pretende añadir a la coleccion
   */
  añadirBien(nuevoBien: Bien): void {
    this.coleccionBienes.push(nuevoBien);
  }
  /**
   * Metodo que permite eliminar un bien de la coleccion de bienes
   * @param item - bien que se pretende eliminar
   */
  eliminarBien(item: Bien): string | undefined {
    let indice = -1;
    indice = this.coleccionBienes.indexOf(item);
    if (indice != -1) {
      this.coleccionBienes.splice(indice,1);
      return "Se ha eliminado el bien correctamente"
    } 
    return undefined;
  }
  /**
   * Método que retorna el tamaño de la colección de Bienes
   * @returns tamaño de la colección
   */
  tamColeccionBienes(): number {
    return this.coleccionBienes.length;
  }
  /**
   * Método que retorna el tamaño de la colección de Clientes
   * @returns tamaño de la colección
   */
  tamColeccionClientes(): number {
    return this.coleccionClientes.length;
  }
  /**
   * Método que retorna el tamaño de la colección de Mercaderes
   * @returns tamaño de la colección
   */
  tamColeccionMercaderes(): number {
    return this.coleccionMercaderes.length;
  }
  /**
   * Metodo para añadir un nuevo cliente a la coleccion de clientes
   * @param nuevoCliente - cliente que se pretende añadir a la coleccion
   */
  añadirCliente(nuevoCliente: Cliente): void {
    this.coleccionClientes.push(nuevoCliente);
  }
  /**
   * Método para eliminar un cliente que se encuentra en la coleccion
   * @param item - cliente que se pretende eliminar
   */
  eliminarCliente(item: Cliente): string | undefined {
    let indice = -1;
    indice = this.coleccionClientes.indexOf(item);
    if (indice != -1) {
      this.coleccionClientes.splice(indice,1);
      return "Se ha eliminado el cliente correctamente"
    } 
    return undefined;
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
   * Metodo para listar los bienes
   */
  MostrarBienes(): string[] {
    return this.coleccionBienes.map(item => item.print());
  }
  /**
   * Metodo para listar los mercaderes
   */
  MostrarMercaderes(): string[] {
    return this.coleccionMercaderes.map(item => item.print());
  }
  /**
   * Metodo para listar los clientes
   */
  MostrarClientes(): string[] {
    return this.coleccionClientes.map(item => item.print());
  }
  /**
   * Metodo para buscar un bien en la coleccion de bienes
   * @param item - item que puede ser el nombre, tipo o descripción de los bienes
   * @param formato - alfabéticamente o por valor en coronas
   * @param ordenElegido - orden ascendente o descendente
   * @returns información de los bienes específico
   */
  consultarBien(item: string, formato: modoOrdenar, ordenElegido: orden ): number[]  {
   return this.coleccionBienes.filter(nuevo => 
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