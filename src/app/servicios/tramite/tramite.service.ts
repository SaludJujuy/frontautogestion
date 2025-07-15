import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Tramite } from 'src/app/clases/tramite/tramite';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  urlBasePrueba: string = "http://192.168.0.104:8000";
  entidad: string = "tramite";

  constructor(private _http: HttpClient) {

  }

  async registrar_tramite(data:any):Promise<any>{
    // Paso 1: obtener el token CSRF
    console.log(data);
    //this._http.get(`${this.urlBasePrueba}/sanctum/csrf-cookie`, {
    //  withCredentials: true
    //});

    // Paso 2: enviar el POST con las cookies
    return this._http.post(`${this.urlBasePrueba}/tramite/prueba/agregar`, data, {
      withCredentials: true
    });

    //const url = `${this.urlBasePrueba}${this.entidad}/prueba/agregar`;

    //return this._http.post(url,data);
  }
}
