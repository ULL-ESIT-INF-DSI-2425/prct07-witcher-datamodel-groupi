import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';
import { Cliente } from "./Cliente.js";
import { Mercader } from "./Mercader.js";
import { Bien } from "./Bien.js";
import { NuevaTransaccion } from "./Transaccion.js";
import { GestorCliente } from "./GestorClientes.js";
import { GestorMercader } from "./GestorMercaderes.js";
import { Inventario } from "./Inventario.js";

// Interfaces de cada base de datos de los elementos del juego
interface ClientesDB { clientes: Cliente[]; }
interface MercaderesDB { mercaderes: Mercader[]; }
interface InventarioDB { inventario: Bien[]; }
interface TransaccionesDB { transacciones: NuevaTransaccion[]; }

/**
 * Interfaz para poder hacer informes de stock con LowSync
 */
interface InformeStockDB {
  bienes: string[]; 
}

/**
 * Interfaz para poder hacer informes de bien mas vendido con LowSync
 */
interface InformeMasVendidoDB {
  id: number;
  cantidad: number;
}

/**
 * Interfaz para hacer informe de gastos con LowSync
 */
interface IngresosGastosDB { 
  ingresos: number; 
  gastos: number; 
}

/**
 * Interfaz para hacer informes de historial de transacciones con LowSync
 */
interface HistorialTransaccionesDB { 
  transacciones: NuevaTransaccion[]; 
}

export class GestorDB {
  private _dbClientes: LowSync<ClientesDB>;
  private _dbMercaderes: LowSync<MercaderesDB>;
  private _dbInventario: LowSync<InventarioDB>;
  private _dbTransacciones: LowSync<TransaccionesDB>;
  private _gestorClientes: GestorCliente;
  private _gestorMercaderes: GestorMercader;
  private _inventario: Inventario;
  private _transacciones: NuevaTransaccion[];

  /**
   * Se trata del constructor de la base de datos que lee todos los datos de los ficheros de inicializacion
   * que guardamos en el directorio /db
   */
  constructor() {
    this._dbClientes = new LowSync(new JSONFileSync<ClientesDB>('./db/iniClientes.json'), { clientes: [] });
    this._dbClientes.read();
    this._gestorClientes = new GestorCliente(this._dbClientes.data.clientes);
    this._dbMercaderes = new LowSync(new JSONFileSync<MercaderesDB>('./db/iniMercaderes.json'), { mercaderes: [] });
    this._dbMercaderes.read();
    this._gestorMercaderes = new GestorMercader(this._dbMercaderes.data.mercaderes);
    this._dbInventario = new LowSync(new JSONFileSync<InventarioDB>('./db/iniInventario.json'), { inventario: [] });
    this._dbInventario.read();
    this._inventario = new Inventario(this._dbInventario.data.inventario);
    this._dbTransacciones = new LowSync(new JSONFileSync<TransaccionesDB>('./db/iniTransacciones.json'), { transacciones: [] });
    this._dbTransacciones.read();
    this._transacciones = this._dbTransacciones.data.transacciones;
  }

  /**
   * Getter del gestor de clientes
   */
  get gestorCliente(): GestorCliente { 
    return this._gestorClientes; 
  }
  /**
   * Getter del gestor de Mercaderes
   */
  get gestorMercaderes(): GestorMercader { 
    return this._gestorMercaderes; 
  }
  /**
   * Getter del inventario
   */
  get inventario(): Inventario { 
    return this._inventario; 
  }
  /**
   * Getter de las transacciones
   */
  get transacciones(): NuevaTransaccion[] { 
    return this._transacciones; 
  }

  /**
   * Metodo que permite inicializar la base de datos con un read de los ficheros
   */
  iniDB(): void {
    this._dbClientes.read();
    this._dbMercaderes.read();
    this._dbInventario.read();
    this._dbTransacciones.read();
  }

  /**
   * Metodo que permite guardar todos los cambios en la base de datos
   */
  outDB(): void {
    this._dbClientes.data.clientes = this._gestorClientes.coleccionClientes;
    this._dbMercaderes.data.mercaderes = this._gestorMercaderes.coleccionMercaderes;
    this._dbInventario.data.inventario = this._inventario.coleccionBienes;
    this._dbTransacciones.data.transacciones = this._transacciones;

    this._dbClientes.write();
    this._dbMercaderes.write();
    this._dbInventario.write();
    this._dbTransacciones.write();
  }

  /**
   * Método para generar informe de stock
   */
  generarInformeStock(): void {
    const data = this._inventario.MostrarBienes(); 
    const dbStock = new LowSync<InformeStockDB>(new JSONFileSync('./informes/stock.json'), { bienes: [] });
    dbStock.data = { bienes: data };
    dbStock.write();
  }

  /**
   * Método para generar el informe del bien más vendido
   */
  generarInformeMasVendido(): void {
    const conteo: [number, number][] = [];
    this._transacciones.forEach(transaccion => {
      if (transaccion.tipo === 'venta') {
        transaccion.bienes.forEach(([id, cantidad]) => {
          const index = conteo.findIndex(([existingId]) => existingId === id);
          if (index !== -1) {
            conteo[index][1] += cantidad;
          } else {
            conteo.push([id, cantidad]);
          }
        });
      }
    });
    const informe = conteo
      .map(([id, cantidad]) => ({ id, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad);

    const dbMasVendido = new LowSync<InformeMasVendidoDB[]>(new JSONFileSync('./informes/mas_vendido.json'), []);
    dbMasVendido.data = informe;
    dbMasVendido.write();
  }

  /**
   * Método para generar el informe de ingresos y gastos
   */
  generarInformeIngresosGastos(): void {
    let ingresos = 0;
    let gastos = 0;
    this._transacciones.forEach(transaccion => {
      if (transaccion.tipo === 'venta') {
        ingresos += transaccion.totalCoronas;
      } else if (transaccion.tipo === 'compra') {
        gastos += transaccion.totalCoronas;
      }
    });
    const informe = { ingresos, gastos };
    const dbIngresosGastos = new LowSync<IngresosGastosDB>(new JSONFileSync('./informes/ingresos_gastos.json'), { ingresos: 0, gastos: 0 });
    dbIngresosGastos.data = informe;
    dbIngresosGastos.write();
  }

  /**
   * Método para generar el historial de transacciones de un cliente o mercader
   */
  generarHistorialTransacciones(id: number, tipo: 'cliente' | 'mercader'): void {
    const historial = this._transacciones.filter(transaccion => 
      (tipo === 'cliente' && transaccion.idCliente === id) ||
      (tipo === 'mercader' && transaccion.idMercader === id)
    );
    const dbHistorial = new LowSync<HistorialTransaccionesDB>(new JSONFileSync(`./informes/historial_${tipo}_${id}.json`), { transacciones: [] });
    dbHistorial.data = { transacciones: historial };
    dbHistorial.write();
  }
}
