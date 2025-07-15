export class Prestador {
    public Nombre: string;
    public NroPrestador: number;
    public Matricula: number;
    public Profesion: string;
    public id: number;

    constructor(id:number,nombre: string, NroPrestador: number ,profesion: string = '', matricula: number = 0) {
        this.id = id;
        this.Nombre = nombre;
        this.Matricula = matricula;
        this.Profesion = profesion;
        this.NroPrestador = NroPrestador;
    }

    getNombre(): string {
        return this.Nombre;
    }

    setNombre(nombre: string): void {
        this.Nombre = nombre;
    }

    getMatricula(): number {
        return this.Matricula;
    }
    
    setMatricula(matricula: number): void {
        this.Matricula = matricula;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getNroPrestador(): number {
        return this.NroPrestador;
    }   

    setNroPrestador(nroPrestador: number): void {
        this.NroPrestador = nroPrestador;
    }
}
