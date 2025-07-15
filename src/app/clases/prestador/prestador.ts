export class Prestador {
    public Nombre: string;
    public id: number;
    constructor(id:number,nombre: string) {
        this.id = id;
        this.Nombre = nombre;
    }

    getNombre(): string {
        return this.Nombre;
    }

    setNombre(nombre: string): void {
        this.Nombre = nombre;
    }
}
