import { Cliente, razaCliente } from "./Cliente.js";
/**
 * Clase para representar la colleción de Clientes
 */
export class GestorCliente {
  private _coleccionClientes : Cliente[];
  /**
   * Constructor de la clase GestorCliente
   * @param coleccionClientes - array en el que se almacenan los clientes
   */
  constructor(coleccionClientes: Cliente[]) {
    this._coleccionClientes = coleccionClientes;
  }
  /**
   * Getter de la coleccion de clientes
   */
  get coleccionClientes() : Cliente[] {
    return this._coleccionClientes;
  }
  /**
   * Método que retorna el tamaño de la colección de Clientes
   * @returns tamaño de la colección
   */
  tamColeccionClientes(): number {
    return this.coleccionClientes.length;
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
   * Metodo para listar los clientes
   */
  MostrarClientes(): string[] {
    return this.coleccionClientes.map(item => item.print());
  }
  /**
   * Método para localizar a clientes por su nombre
   * @param nombre - nombre del cliente
   * @returns lista de clientes con ese nombre
   */
  buscarNombre(nombre: string): Cliente[] {
    return this.coleccionClientes.filter(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
  }

  /**
   * Método para localizar a clientes por su raza
   * @param raza - raza del cliente
   * @returns lista de clientes con esa raza
   */
  buscarRaza(raza: razaCliente): Cliente[] {
    return this.coleccionClientes.filter(cliente => cliente.raza === raza);
  }
  /**
   * Método para localizar a clientes por su ubicación
   * @param ubicacion - ubicación del cliente
   * @returns lista de clientes con esa ubicación
   */
  buscarUbicacion(ubicacion: string): Cliente[] {
    return this.coleccionClientes.filter(cliente => cliente.ubicacion === ubicacion);
  }
  /**
   * Método para localizar un ID
   * @param id - Identificador 
   * @returns Información del cliente
   */
  buscarID(id : number) : Cliente | undefined {
    return this.coleccionClientes.find(cliente => cliente.ID === id);
  }
  /**
   * Obtener IDs de la colección
   * @returns IDs de la colección
   */
  getIDs(): number[] {
    return this._coleccionClientes.map(cliente => cliente.ID);
  }
  /**
   * Modificar la raza de un cliente
   * @param id - identificador del cliente
   * @param nuevaRaza - nuevo valor de la raza
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarRaza(id: number, nuevaRaza: razaCliente): boolean {
    const cliente = this.buscarID(id);
    if (!cliente) {
      return false;
    } 
    cliente.raza = nuevaRaza;
    return true;
  }
  /**
   * Modificar el nombre de un cliente
   * @param id - identificador del cliente
   * @param nuevoNombre - nuevo valor del nombre
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarNombre(id: number, nuevoNombre: string): boolean {
    const cliente = this.buscarID(id);
    if (!cliente) {
      return false;
    } 
    cliente.nombre = nuevoNombre;
    return true;
  }
  /**
   * Modificar la ubicación del cliente
   * @param id - identificador del cliente
   * @param nuevaUbicacion - nuevo valor de la ubicación
   * @returns true si se realizó el cambio y false en caso contrario
   */
  modificarUbicacion(id: number, nuevaUbicacion: string): boolean {
    const cliente = this.buscarID(id);
    if (!cliente) {
      return false;
    } 
    cliente.ubicacion = nuevaUbicacion;
    return true;
  }
}