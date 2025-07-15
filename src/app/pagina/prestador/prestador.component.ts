import { Component } from '@angular/core';
import { DatosService } from '../../servicios/transferencia/datos.service';
import { PrestadorService } from 'src/app/servicios/prestador/prestador.service';
import { TramiteService } from 'src/app/servicios/tramite/tramite.service';
import { Prestador } from 'src/app/clases/prestador/prestador';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.css']
})

export class PrestadorComponent {
  prest: Prestador = new Prestador(0,'');
  nombre: string = '';
  dato: any;
  prestador: any;
  busqueda: string = '';
  sobre: string = '';
  consulta: string = '';
  practica: string = '';
  campoActivo: string ='';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
  constructor(private cdr: ChangeDetectorRef, public datosService: DatosService, private prestadorService: PrestadorService,private tramiteService: TramiteService, private router: Router) {
    this.dato = this.datosService.getDato();
     this.obtenerDatosPrestador();
    console.log('Dato recibido en PrestadorComponent:', this.dato);
  }

  ngOnInit() {
   
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

  obtenerDatosPrestador() {
    this.prestadorService.buscar_prestador(this.dato).subscribe(
      (data: any) => {
        this.prest.setNombre(data.Nombre);
        this.prest.id = data.IdPrestador;
        this.cdr.detectChanges(); 
        console.log('Datos del prestador obtenidos:', this.prest);
      },
      (error: any) => {
        console.error('Error al obtener los datos del prestador:', error);
      }
    );
  }

  async registrarTramite() {
    const datos = {
      prestador: this.prest.id,
      sobre: this.sobre,
      consulta: this.consulta,
      practica: this.practica
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
