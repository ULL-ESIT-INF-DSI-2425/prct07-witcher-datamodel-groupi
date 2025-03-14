type materialBienes = "Acero de Mahakam" | "cuero endurecido" | "esencia mágica" | "mutágenos de bestias antiguas";
export class Bienes {
  constructor(private _ID: number, private _nombre: string, private _descripcion: string, private _material: materialBienes, private _peso: number, private _valorEnCoronas: number) {}   
  get ID(): number {
    return this._ID;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(nuevoNombre: string) {
    this._nombre = nuevoNombre;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(nuevaDescripcion: string) {
    this._descripcion = nuevaDescripcion;
  }

  get material(): materialBienes {
    return this._material;
  }

  set material(nuevoMaterial: materialBienes) {
    this._material = nuevoMaterial;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(nuevoPeso: number) {
    this._peso = nuevoPeso;
  }

  get valorEnCoronas(): number {
    return this._valorEnCoronas;
  }

  set valorEnCoronas(nuevoValor: number) {
    this._valorEnCoronas = nuevoValor;
  }
}