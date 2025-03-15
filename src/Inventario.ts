import { Bien } from "./Bien.ts";
import { Cliente } from "./Cliente.ts";
import { Mercader } from "./Mercader.ts";

export class Inventario {
  constructor(private coleccionBienes: Bien[], private coleccionClientes: Cliente[], private coleccionMercaderes: Mercader[]) {
  }
  
}