export type TipoTransaccion = "venta" | "compra" | "devolucion"

export type NuevaTransaccion =  {
  fecha: Date;
  tipo: TipoTransaccion;
  bienes: [id_bien: number, cantidad: number][];
  totalCoronas: number;
  idCliente?: number;
  idMercader?: number;
}

/**
 * Clase para representar las transacciones
 */
export class Transaccion {
  /**
   * Atributo privado para la lista de transacciones
   */
  private _transacciones: NuevaTransaccion[];
  /**
   * Constructor de la clase Transaccion
   */
  constructor() {
    this._transacciones = [];
  }
  get transacciones() : NuevaTransaccion[] {
    return this._transacciones;
  }
  /**
   * Método para realizar una transacción de tipo Venta
   * @param idCliente - identificador del cliente
   * @param bienes - bienes intercambiados
   * @param totalCoronas - cantidad de coronas involucradas
   */
  TransaccionVenta(idCliente: number, bienes: [id_bien: number, cantidad: number][], totalCoronas: number): void {
    this._transacciones.push({
      fecha: new Date(),
      tipo: "venta",
      bienes,
      totalCoronas,
      idCliente
    });
  }
  /**
   * Método para realizar una transacción de tipo Compra
   * @param idMercader - identificador del mercader
   * @param bienes - bienes intercambiados
   * @param totalCoronas - cantidad de coronas involucradas
   */
  TransaccionCompra(idMercader: number, bienes: [id_bien: number, cantidad: number][], totalCoronas: number): void {
    this._transacciones.push({
      fecha: new Date(),
      tipo: "compra",
      bienes,
      totalCoronas,
      idMercader
    });
  }
  /**
   * Método para realizar una transacción de tipo Devolución
   * @param TransaccionId - indentificador de la compra o venta realizada
   */
  TransaccionDevolucion(TransaccionId: number): void {
    const ventaCompraRealizada = this._transacciones[TransaccionId];
    this._transacciones.push({
      fecha: new Date(),
      tipo: "devolucion",
      bienes: ventaCompraRealizada.bienes,
      totalCoronas: 0,
      idCliente: ventaCompraRealizada.idCliente,
      idMercader: ventaCompraRealizada.idMercader
    });
  }
  /**
   * Método que calcula el total de ingresos por ventas a clientes y gastos en adquisiciones a mercaderes
   * @returns total de los ingresos
   */
  TotalIngresos(): number {
    return this._transacciones.filter(transaccion => transaccion.tipo === "venta" || transaccion.tipo === "compra" ).reduce((total, transaccion) => total + transaccion.totalCoronas,0);
  }
  /**
   * Método que muestra el histórico de transacciones de un cliente o mercader específico
   * @param id - identificador del cliente o mercader
   * @returns histórico de transacciones
   */
  HistoricoTransacciones(id: number): NuevaTransaccion[] {
    return this._transacciones.filter(transaccion => transaccion.idCliente === id || transaccion.idMercader === id);
  }
}