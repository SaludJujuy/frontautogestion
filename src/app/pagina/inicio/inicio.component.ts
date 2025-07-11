import { Component } from '@angular/core';
import { DatosService } from '../../servicios/transferencia/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  busqueda: string = '';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  constructor(private datosService: DatosService, private router: Router) {
    
  }

  agregarNumero(tecla: string) {
    this.busqueda += tecla;
  }

  borrar() {
    this.busqueda = this.busqueda.slice(0, -1);
  }

  buscar() {
    let valorNumerico = Number(this.busqueda);
    this.datosService.setDato(valorNumerico);
    this.router.navigate(['/prestador']); 
  }

  guardarDato() {
    this.datosService.setDato(this.busqueda);
    console.log('Dato guardado:', this.busqueda);   
  }
}
