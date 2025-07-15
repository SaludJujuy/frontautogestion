import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tramite } from 'src/app/clases/tramite/tramite';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  urlBase: string = "http://10.0.0.19:3000/";
  urlBasePrueba: string = "http://192.168.0.104:8000";
  entidad: string = "tramite";

  constructor(private _http: HttpClient) {

  }

  registrar_tramite(data:any):Observable<any>{
    // Paso 1: obtener el token CSRF
    console.log(data);
    //this._http.get(`${this.urlBasePrueba}/sanctum/csrf-cookie`, {
    //  withCredentials: true
    //});

    // Paso 2: enviar el POST con las cookies
    return this._http.post(`${this.urlBase}/tramite/agregar`, data, {
      withCredentials: true
    });

    //const url = `${this.urlBasePrueba}${this.entidad}/prueba/agregar`;

    //return this._http.post(url,data);
  }
}
