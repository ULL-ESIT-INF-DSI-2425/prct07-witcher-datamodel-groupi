import { LowSync } from 'lowdb';
import {JSONFileSync} from 'lowdb/node';
import { NuevaTransaccion, Transaccion } from "./Transaccion.js";
import { Inventario } from "./Inventario.js";

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

/**
 * Función para generar informe de stock
 * @param inventario es el inventario del cual sacamos la informacion
 */
export function generarInformeStock(inventario : Inventario) {
    const data = inventario.MostrarBienes(); 
    const dbStock = new LowSync<InformeStockDB>(new JSONFileSync('./informes/stock.json'), { bienes: [] });
    dbStock.data = { bienes: data };
    dbStock.write();
}

/**
 * Función para generar el informe del bien más vendido
 * @param transacciones - son las transacciones que debemos analizar
 */
export function generarInformeMasVendido(transacciones : Transaccion) {
    const conteo: [number, number][] = [];
    transacciones.transacciones.forEach(transaccion => {
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
    const informe = conteo.map(([id, cantidad]) => ({ id, cantidad })).sort((a, b) => b.cantidad - a.cantidad);
    const dbMasVendido = new LowSync<InformeMasVendidoDB[]>(new JSONFileSync('./informes/mas_vendido.json'), []);
    dbMasVendido.data = informe;
    dbMasVendido.write();
}

/**
 * Función para generar el informe de ingresos y gastos
 * @param transacciones - son las transacciones que debemos analizar
 */
export function generarInformeIngresosGastos(transacciones : Transaccion) {
    let ingresos = 0;
    let gastos = 0;
    transacciones.transacciones.forEach(transaccion => {
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
 * Función para generar el historial de transacciones de un cliente o mercader
 * @param transacciones - Lista de transacciones completas.
 * @param id - ID del cliente o mercader.
 * @param tipo - Tipo de personaje ('cliente' o 'mercader').
 */
export function generarHistorialTransacciones(transacciones: Transaccion, id: number, tipo: "cliente" | "mercader") {
  const historial = transacciones.transacciones.filter(transaccion => {
    if (tipo === 'cliente' && transaccion.idCliente === id) {
      return true;
    }
    if (tipo === 'mercader' && transaccion.idMercader === id) {
      return true;
    }
    return false;
  });
  const dbHistorial = new LowSync<HistorialTransaccionesDB>(
    new JSONFileSync(`./informes/historial_${tipo}_${id}.json`),
    { transacciones: [] }
  );
  dbHistorial.data = { transacciones: historial };
  dbHistorial.write();
}
