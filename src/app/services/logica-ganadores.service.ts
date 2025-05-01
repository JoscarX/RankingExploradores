import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IAgregarGanadores } from '../interfaces/IAgregarGanadores';
import { Observable } from 'rxjs';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';

@Injectable({
  providedIn: 'root'
})
export class LogicaGanadoresService {

private _http=inject(HttpClient);
private baseUrlApi = environment.baseUrlApi;

  constructor() { }

  AgregarGanadores(object:IAgregarGanadores):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/LogicaPuntos/AgregarGanadores`,object)
  }
}
