import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Cliente } from "./Cliente.js";
import { Mercader } from "./Mercader.js";
import { Bien } from "./Bien.js";
import { NuevaTransaccion } from "./Transaccion.js";
import { GestorCliente } from "./GestorClientes.js";
import { GestorMercader } from "./GestorMercaderes.js";
import { Inventario } from "./Inventario.js";
import * as fs from 'fs';
import path from 'path';

/**
 * Interfaz de la estructura de la base de datos de nuestro programa
 * Se usa para formatear el Low
 */
interface DBStructure {
  clientes: Cliente[];
  mercaderes: Mercader[];
  inventario: Bien[];
  transacciones: NuevaTransaccion[];
};

/**
 * Inicializacion por defecto de la base de datos
 */
const defaultData : DBStructure = {
  clientes: [],
  mercaderes: [],
  inventario: [],
  transacciones: [],
};

export class GestorDB {
  private _db: Low<DBStructure>;
  private _gestorClientes: GestorCliente;
  private _gestorMercaderes: GestorMercader;
  private _inventario: Inventario;
  private _transacciones: NuevaTransaccion[];

  /**
   * Constructor de la clase GestorDB
   */
  constructor() {
    this._db = new Low(new JSONFile<DBStructure>('./db/database.json'), defaultData); // inicializo vacio, no borrar database.json
    this._gestorClientes = new GestorCliente([]);
    this._gestorMercaderes = new GestorMercader([]);
    this._inventario = new Inventario([]);
    this._transacciones = [];
  }

  /**
   * Getter del gestor de clientes
   */
  get gestorCliente() : GestorCliente {
    return this._gestorClientes;
  }

  /**
   * Getter del gestor de Mercaderes
   */
  get gestorMercaderes() : GestorMercader {
    return this._gestorMercaderes;
  }

  /**
   * Getter del inventario
   */
  get inventario() : Inventario {
    return this._inventario;
  }

  /**
   * Getter de la base de datos
   */
  get db() : Low<DBStructure> {
    return this._db;
  }

  /**
   * Getter de la lista de transacciones
   */
  get transacciones() : NuevaTransaccion[] {
    return this._transacciones;
  }

  /**
   * Metodo que permite inicializar la base de datos del juego a partir de ficheros 
   * json en el directorio /db
   */
  iniDB(): void {
    const dbDirectory = './db/';
    const files = fs.readdirSync(dbDirectory);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(dbDirectory, file);
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (file === 'iniClientes.json') {
          this._gestorClientes = new GestorCliente(fileData);
        } else if (file === 'iniMercaderes.json') {
          this._gestorMercaderes = new GestorMercader(fileData);
        } else if (file === 'iniInventario.json') {
          this._inventario = new Inventario(fileData);
        } else if (file === 'iniTransacciones.json') {
          this._transacciones = fileData;
        }
      }
    });
  }

  /**
   * Metodo que permite hacer el guardado de los cambios realizados durante la partida
   * Se ejecuta justo al terminar el main y permite guardar todo en los respectivos 
   * ficheros json
   */
  outDB(): void {
    const dbDirectory = './db/';
    fs.writeFileSync(path.join(dbDirectory, 'iniClientes.json'), JSON.stringify(this._gestorClientes.coleccionClientes, null, 2));
    fs.writeFileSync(path.join(dbDirectory, 'iniMercaderes.json'), JSON.stringify(this._gestorMercaderes.coleccionMercaderes, null, 2));
    fs.writeFileSync(path.join(dbDirectory, 'iniInventario.json'), JSON.stringify(this._inventario.coleccionBienes, null, 2));
    fs.writeFileSync(path.join(dbDirectory, 'iniTransacciones.json'), JSON.stringify(this._transacciones, null, 2));
    console.log("Archivos actualizados con éxito.");
  }

  /**
   * Metodo que permite generar un informe sobre el stock disponible en el inventario
   * en esa fecha determinada
   */
  generarInformeStock(): void {
    const informe = this._inventario.MostrarBienes();
    fs.writeFileSync(`./informes/stock_v${Date.now()}.json`, JSON.stringify(informe, null, 2));
  }  

  /**
   * Metodo para generar un informe del bien más vendido del inventario primero hacemos un conteo
   * por los bienes que hay si existe sumamos 1 a la cantidad y si no lo agregamos a la tupla
   * al final buscarmos el mas vendido
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
    fs.writeFileSync(`./informes/mas_vendido_v${Date.now()}.json`, JSON.stringify(informe, null, 2));
  }
  
  /**
   * Método que calcula el total de ingresos por ventas y gastos en compras
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
    fs.writeFileSync(`./informes/ingresos_gastos_v${Date.now()}.json`, JSON.stringify(informe, null, 2));
  }

  /**
   * Metodo que permite generar un informe del Historial de transacciones de un cliente o mercader
   * @param id - id del cliente o mercader
   * @param tipo - tipo del personaje (cliente o mercader)
   */
  generarHistorialTransacciones(id: number, tipo: 'cliente' | 'mercader'): void {
    const historial = this._transacciones.filter(transaccion => 
      (tipo === 'cliente' && transaccion.idCliente === id) ||
      (tipo === 'mercader' && transaccion.idMercader === id)
    );
    fs.writeFileSync(`./informes/historial_${tipo}_${id}_v${Date.now()}.json`, JSON.stringify(historial, null, 2));
  }
}
