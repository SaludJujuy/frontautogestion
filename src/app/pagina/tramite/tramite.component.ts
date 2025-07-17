import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/transferencia/datos.service';
import { TramiteService } from 'src/app/servicios/tramite/tramite.service';
import * as qz from 'qz-tray';
+
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
  campoActivo: string = '';
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
      this.tramiteService.registrar_tramite(datos).subscribe({
        next: (response) => {
          if (response.success) {
            const comprobante = this.generarComprobante(response);
            this.imprimirFiscal(comprobante);
            this.router.navigate(['/inicio']);
          } else {
            console.error('Error en registro:', response);
            alert('Error al registrar trámite');
          }
        },
        error: (error) => {
          console.error('Error al registrar trámite', error);
          alert('Error al registrar trámite');
        }
      });
      this.router.navigate(['/inicio']);
      //alert('Trámite registrado correctamente');
    } catch (error) {
      console.error('Error al registrar trámite', error);
      alert('Ocurrió un error');
    }
  }

  salir() {
    this.router.navigate(['/inicio']);
  }

  generarComprobante(data: any): string {
    // Adaptá esto según los datos que te retorne el backend
    return `
      ---------------------------
      TRÁMITE DE AUTOGESTIÓN
      ---------------------------
      Prestador: ${this.prestadorElegido.Nombre || 'N/D'}
      Fecha: ${new Date().toLocaleString()}
      Nro Sobre: ${this.sobre}
      Consultas: ${this.consulta}
      Prácticas: ${this.practica}

      Gracias por su gestión.
      ---------------------------
      `;
  }

  imprimirFiscal(contenido: string) {
    qz.websocket.connect().then(() => {
      return qz.printers.find();
    }).then((printer) => {
      const config = qz.configs.create(printer);
      const data = [
        '\x1B\x40',        // Reset impresora ESC @
        contenido,
        '\n\n\n\n\n\n\n\n',
        '\x1D\x56\x00'     // Corte de papel
      ];
      return qz.print(config, data);
    }).then(() => {
      qz.websocket.disconnect();
      console.log('Impresión enviada');
    }).catch(err => {
      console.error('Error en impresión fiscal:', err);
      alert('Error al imprimir en impresora fiscal. ¿Está QZ Tray corriendo?');
    });
  }
}
