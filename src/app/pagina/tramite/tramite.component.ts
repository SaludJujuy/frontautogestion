import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/servicios/transferencia/datos.service';
import { TramiteService } from 'src/app/servicios/tramite/tramite.service';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css']
})
export class TramiteComponent {
  inputSobreInvalido: boolean = false;
  inputConsultaInvalido: boolean = false;
  inputPracticaInvalido: boolean = false;
  pasoActual: number = 1;
  prestadorElegido: any;
  sobre: string = '';
  consulta: string = '';
  practica: string = '';
  campoActivo: string = '';
  teclas: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  @ViewChild('inputSobre') inputSobre!: ElementRef;
  @ViewChild('inputConsulta') inputConsulta!: ElementRef;
  @ViewChild('inputPractica') inputPractica!: ElementRef;


  ngAfterViewInit(): void {
    // Le da un pequeño delay para asegurarse que la vista ya esté cargada completamente
    setTimeout(() => {
      this.inputSobre.nativeElement.focus();
      this.campoActivo = 'sobre';
    });
  }

  constructor(
    private router: Router,
    private datosService: DatosService,
    private tramiteService: TramiteService
  ) {
    this.prestadorElegido = this.datosService.getPrestador();
  }

  siguientePaso() {
    if (this.pasoActual === 1) {
    if (!this.sobre || this.sobre.toString().trim() === '') {
      this.inputSobreInvalido = true;
      alert('Debe ingresar el número de sobre');
      return;
    }
    this.inputSobreInvalido = false;
    this.pasoActual++;
    setTimeout(() => this.inputConsulta?.nativeElement?.focus(), 0);
  } else if (this.pasoActual === 2) {
    if (!this.consulta || this.consulta.toString().trim() === '') {
      this.inputConsultaInvalido = true;
      alert('Debe ingresar la cantidad de consultas');
      return;
    }
    this.inputConsultaInvalido = false;
    this.pasoActual++;
    setTimeout(() => this.inputPractica?.nativeElement?.focus(), 0);
  }
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
    this.sobre = '';
    this.consulta = '';
    this.practica = '';
    this.pasoActual = 1;
    setTimeout(() => this.inputSobre.nativeElement.focus(), 0);
  }

  registrarTramite() {
    // Validaciones de campos
    let valido = true;

    if (!this.sobre || this.sobre.toString().trim() === '') {
      this.inputSobreInvalido = true;
      valido = false;
    } else {
      this.inputSobreInvalido = false;
    }

    if (!this.consulta || this.consulta.toString().trim() === '') {
      this.inputConsultaInvalido = true;
      valido = false;
    } else {
      this.inputConsultaInvalido = false;
    }

    if (!this.practica || this.practica.toString().trim() === '') {
      this.inputPracticaInvalido = true;
      valido = false;
    } else {
      this.inputPracticaInvalido = false;
    }

    if (!valido) {
      alert('Por favor, complete todos los campos antes de registrar el trámite.');
      return;
    }

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

            //console.log('Datos del trámite para impresión:', impresion);
            console.log(impresion , impresion.contenido);
            if (impresion) {
              this.imprimirAutomatico(impresion);
              console.log('Impresión automática iniciada');
            } 

            this.borrar();
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
                body {
                margin: 0;
                padding: 0;
              }

              .contenido {
                font-family: monospace;
                font-size: 11pt;
                white-space: pre-wrap;
                width: auto;
                height: auto;
                transform-origin: top left;
                position: absolute;
                left: 0;
              }
              </style>
            </head>
            <body onload="window.focus(); window.print(); setTimeout(() => window.close(), 500);">
              <div class="contenido">
                ${texto.replace(/\n/g, '<br>')}
              </div>
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

  verificarLongitudSobre() {
    if (this.sobre && this.sobre.length === 4) {
      this.inputConsulta.nativeElement.focus();
      this.campoActivo = 'consulta';
    }
  }
  evitarClick(event: MouseEvent) {
    event.preventDefault(); // No deja enfocar con click
  }
  salir() {
    this.router.navigate(['/inicio']);
  }
}
