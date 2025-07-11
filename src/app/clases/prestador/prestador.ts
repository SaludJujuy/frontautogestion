export class Prestador {
    public Nombre: string;
    
    constructor(nombre: string) {
        this.Nombre = nombre;
    }

    getNombre(): string {
        return this.Nombre;
    }

    setNombre(nombre: string): void {
        this.Nombre = nombre;
    }
}
