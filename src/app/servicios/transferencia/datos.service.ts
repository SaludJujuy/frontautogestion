import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private dato:any;
  private prestador:any;

  constructor() { 

  }

  setDato(dato: any) {
    this.dato = dato;
  }
  
  getDato(): any {
    return this.dato;
  }

  getPrestador(): any {
    return this.prestador;
  }
  setPrestador(prestador: any) {
    this.prestador = prestador;
  }


}
