import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/transferencia/datos.service';
import { TramiteService } from 'src/app/servicios/tramite/tramite.service';

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
  constructor(private router: Router, private datosService: DatosService, private tramiteService: TramiteService) {
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

  async registrarTramite() {
    const datos = {
      prestador: this.prestadorElegido.IdPrestador,
      sobre: Number(this.sobre),
      consulta: Number(this.consulta),
      practica: Number(this.practica)
    }

    try {
      await this.tramiteService.registrar_tramite(datos);
      //alert('Trámite registrado correctamente');
    } catch (error) {
      console.error('Error al registrar trámite', error);
      alert('Ocurrió un error');
    }
  }

  salir() {
    this.router.navigate(['/inicio']); 
  }
}
