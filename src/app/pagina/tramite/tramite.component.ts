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
  campoActivo: string = '';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  constructor(
    private router: Router,
    private datosService: DatosService,
    private tramiteService: TramiteService
  ) {
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

  registrarTramite() {
    const datos = {
      prestador: this.prestadorElegido.IdPrestador,
      sobre: Number(this.sobre),
      consulta: Number(this.consulta),
      practica: Number(this.practica)
    };

    this.tramiteService.registrar_tramite(datos).subscribe(
      (response: any) => {
        this.tramiteService.imprimir_tramite(datos).subscribe(
          (impresion: any) => {
            console.log('Datos del trámite para impresión:', impresion);
            if (impresion) {
              this.imprimirAutomatico(impresion);
            } else {
              console.log('Datos del trámite para impresión contenido:', impresion.contenido);
            
              alert('No se recibió contenido para imprimir.');
            }

            this.router.navigate(['/inicio']);
          },
          (error: any) => {
            console.error('Error al imprimir el trámite:', error);
            this.router.navigate(['/inicio']);
          }
        );
      },
      (error: any) => {
        console.error('Error al registrar trámite:', error);
      }
    );
  }

  imprimirAutomatico(texto: string) {
    const imprimir = () => {
      const iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <title>Comprobante</title>
              <style>
                @page { size: portrait; }
                body {
                  font-family: monospace;
                  font-size: 12pt;
                  white-space: pre;
                  margin: 0;
                  padding: 10px;
                }
              </style>
            </head>
            <body onload="window.focus(); window.print(); setTimeout(() => window.close(), 500);">
              ${texto.replace(/\n/g, '<br>')}
            </body>
          </html>
        `);
        doc.close();
      }
    };

    // Imprime la primera copia
    imprimir();

    // Espera 2 segundos y luego imprime la segunda
    setTimeout(() => {
      imprimir();
    }, 2000);
  }

  salir() {
    this.router.navigate(['/inicio']);
  }
}
