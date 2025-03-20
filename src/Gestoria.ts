/*
import { Low, JSONFile } from "lowdb";
import fs from "fs-extra";
import path from "path";
import { Transaccion } from "./Transaccion.ts";

type Schema = {
  transacciones: Transaccion[];
};

export class Gestora {
  private db: Low<Schema>;
  private informesDir = path.join(__dirname, "..", "informes");

  constructor() {
    const adapter = new JSONFile<Schema>("database.json");
    this.db = new Low(adapter, { transacciones: [] });
    this.initDB();
  }

  private async initDB() {
    await this.db.read();
    this.db.data ||= { transacciones: [] };
    await this.db.write();
  }

  async registrarTransaccion(transaccion: Transaccion) {
    await this.db.read();
    this.db.data.transacciones.push(transaccion);
    await this.db.write();
  }

  async obtenerStockDeBien(id_bien: number) {
    await this.db.read();
    return this.db.data.transacciones
      .flatMap((t) => t.bienes) // Aquí 'b' es una tupla [id_bien, cantidad]
      .filter(([id]) => id === id_bien) // Accedemos al primer elemento de la tupla (id)
      .reduce((acc, [, cantidad]) => acc + cantidad, 0); // Accedemos al segundo elemento de la tupla (cantidad)
  }

  async bienesMasVendidos() {
    await this.db.read();
    const conteo: Record<number, number> = {};

    this.db.data.transacciones.forEach((t) => {
      if (t.tipo === "venta") {
        t.bienes.forEach((b) => {
          conteo[b.id] = (conteo[b.id] || 0) + b.cantidad;
        });
      }
    });

    return Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .map(([id, cantidad]) => ({ id: Number(id), cantidad }));
  }

  async ingresosYgastos() {
    await this.db.read();
    let ingresos = 0;
    let gastos = 0;

    this.db.data.transacciones.forEach((t) => {
      if (t.tipo === "venta") ingresos += t.totalCoronas;
      if (t.tipo === "compra") gastos += t.totalCoronas;
    });

    return { ingresos, gastos };
  }

  async historialDeTransacciones(id: number, esCliente = true) {
    await this.db.read();
    return this.db.data.transacciones.filter((t) =>
      esCliente ? t.id_cliente === id : t.id_mercader === id
    );
  }

  // Generación de informes en "informes/"
  async generarInforme(tipo: string) {
    await fs.ensureDir(this.informesDir);
    const fecha = new Date().toISOString().replace(/[:.]/g, "-");
    const filePath = path.join(this.informesDir, `informe_${tipo}_${fecha}.txt`);

    let contenido = `INFORME: ${tipo.toUpperCase()} - ${new Date().toLocaleString()}\n`;

    if (tipo === "stock") {
      contenido += "Stock de bienes:\n";
      for (const transaccion of this.db.data.transacciones) {
        for (const bien of transaccion.bienes) {
          const stock = await this.obtenerStockDeBien(bien.id);
          contenido += `  - Bien ID ${bien.id}: ${stock} unidades\n`;
        }
      }
    } else if (tipo === "mas_vendidos") {
      const masVendidos = await this.bienesMasVendidos();
      contenido += "Bienes más vendidos:\n";
      masVendidos.forEach((b) => {
        contenido += `  - Bien ID ${b.id}: ${b.cantidad} unidades vendidas\n`;
      });
    } else if (tipo === "ingresos_gastos") {
      const { ingresos, gastos } = await this.ingresosYgastos();
      contenido += `Total de ingresos: ${ingresos} coronas\n`;
      contenido += `Total de gastos: ${gastos} coronas\n`;
    }

    await fs.writeFile(filePath, contenido);
    console.log(`Informe generado: ${filePath}`);
  }
}
*/