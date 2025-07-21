import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tramite } from 'src/app/clases/tramite/tramite';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  urlBase: string = "http://10.0.0.19:3000/api";
  urlBasePrueba: string = "http://192.168.0.104:8000";
  entidad: string = "tramite";

  constructor(private _http: HttpClient) {

  }

  registrar_tramite(data:any):Observable<any>{
    // Paso 1: obtener el token CSRF
    console.log(data);
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200/', // Especifica el origen permitido
          'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', // Métodos permitidos
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
      };
    // Paso 2: enviar el POST con las cookies
    return this._http.post(`${this.urlBase}/tramite/agregar`, data, httpOptions);
  }

  imprimir_tramite(data: any): Observable<any> {
      const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }),
    responseType: 'text' as 'json' // 👈 Esta línea es clave para que Angular no tire error
  };

  return this._http.post(`${this.urlBase}/tramite/imprimir`, data, httpOptions);
  }
}
