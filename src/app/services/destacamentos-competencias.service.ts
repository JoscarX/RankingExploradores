import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IDestacamentosCompetencias, ISetDestacamentoCompetencias } from '../interfaces/IDestacamentosCompetencias';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';

@Injectable({
  providedIn: 'root'
})
export class DestacamentosCompetenciasService {
private _http=inject(HttpClient)
private baseUrlApi = environment.baseUrlApi

  constructor() { }

  GetAllDestacamentoCompetencia():Observable<IDestacamentosCompetencias>{
    return this._http.get<IDestacamentosCompetencias>(`${this.baseUrlApi}/DestacamentoCompetencia/GetAllDestacamentoCompetencia`)
  }
  GetDestacamentoCompetenciasByCompetencias(id:number):Observable<IDestacamentosCompetencias>{
    return this._http.get<IDestacamentosCompetencias>(`${this.baseUrlApi}/DestacamentoCompetencia/GetDestacamentoCompetenciasByCompetencias?id=${id}`)
  }
  SetDestacamentoCompetencia(object:ISetDestacamentoCompetencias):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/DestacamentoCompetencia/SetDestacamentoCompetencia`,object)
  }
  DeleteDestacamentoCompetencia(object:ISetDestacamentoCompetencias):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/DestacamentoCompetencia/EliminarDestacamentoCompetencia`,object)
  }
}
