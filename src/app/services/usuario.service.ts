import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUsuario, IUsuarioSET } from '../interfaces/IUsuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private _http= inject(HttpClient)
private baseUrlApi = environment.baseUrlApi;

  constructor() { }

  GetUsuario(email:string,clave:string):Observable<IUsuario>{
    return this._http.get<IUsuario>(`${this.baseUrlApi}/Usuario/GetUsuario?email=${email}&clave=${clave}`)
  }
}
