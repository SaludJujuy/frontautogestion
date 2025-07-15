import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/transferencia/datos.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css']
})

export class TramiteComponent {
  prestadorElegido: any;
  sobre: string = '';
  consulta: string = '';
  practica: string = '';
  campoActivo: string ='';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  constructor(private router: Router, private datosService: DatosService) {
    this.prestadorElegido = this.datosService.getPrestador();
  }

  agregarNumero(tecla: string) {
    if (this.campoActivo === 'sobre') {
      this.sobre += tecla;
    } else if (this.campoActivo === 'consulta') {
      this.consulta += tecla;
    } else if (this.campoActivo === 'practica') {
      this.practica += tecla;
    }
  }

  borrar() {
    if (this.campoActivo === 'sobre') {
      this.sobre = this.sobre.slice(0, -1);
    } else if (this.campoActivo === 'consulta') {
      this.consulta = this.consulta.slice(0, -1);
    } else if (this.campoActivo === 'practica') {
      this.practica = this.practica.slice(0, -1);
    }
  }
  salir() {
    this.router.navigate(['/inicio']); 
  }
}
