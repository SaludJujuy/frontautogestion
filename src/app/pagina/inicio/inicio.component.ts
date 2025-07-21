import { Component , OnInit, OnDestroy } from '@angular/core';
import { DatosService } from '../../servicios/transferencia/datos.service';
import { Router } from '@angular/router';
import { PrestadorService } from 'src/app/servicios/prestador/prestador.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent {
   selectedIndex = 0;
    private intervalId: any;

  busqueda: string = '';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  mensajeError: string = '';

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % 3; // cambia 3 por la cantidad de tabs
    }, 10000); // rotación cada 4 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  constructor(private datosService: DatosService, private router: Router, _http: PrestadorService) {
    
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
