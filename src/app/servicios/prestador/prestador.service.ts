import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  urlBase: string = "http://10.0.0.19:3000/api/";
  urlBasePrueba: string = "http://192.168.0.104:8000/";
  entidad: string = "prestador";

  constructor(private _http: HttpClient) { 

  }

  buscar_prestador(busqueda: number): Observable<any> {  
    try {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200/', // Especifica el origen permitido
          'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE', // Métodos permitidos
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
      };

      const url = `${this.urlBase}${this.entidad}/buscar?matricula=${busqueda}`;
      console.log(url);
      return this._http.get(url, httpOptions);
      
    } catch (error) {
      console.error('Error al buscar prestador:', error);
      return of([]);  
    }
  }
}
