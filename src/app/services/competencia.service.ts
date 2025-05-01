import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICompetencias } from '../interfaces/ICompetencias';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';
import { Ipaginacion } from '../interfaces/Ipagination';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {
  private _http = inject(HttpClient);
  private baseUrlApi = environment.baseUrlApi;

  constructor() { }

  GetAllCompetencia():Observable<ICompetencias>{
    return this._http.get<ICompetencias>(`${this.baseUrlApi}/Competencias/GetAllCompetencia`)
  }
  GetCompetenciaById(id:number):Observable<ICompetencias>{
    return this._http.get<ICompetencias>(`${this.baseUrlApi}/Competencias/GetCompetenciaById?id=${id}`)
  }
  SetCompetencia(object:ICompetencias):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Competencias/SetCompetencia`,object)
  }
  UpdateCompetencia(object:ICompetencias):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Competencias/UpdateCompetencia`,object)
  }
  SumarPuntosMaximaResistencia(id:number):Observable<IRespuestaSistema>{
    return this._http.get<IRespuestaSistema>(`${this.baseUrlApi}/Competencias/SumarPuntosMaximaResistencia?id=${id}`)
  }
  DeleteCompetencia(id:number):Observable<IRespuestaSistema>{
    return this._http.delete<IRespuestaSistema>(`${this.baseUrlApi}/Competencias/EliminarCompetencia?id=${id}`)
  }
  GetCompetenciasPagination(obj:Ipaginacion):Observable<ICompetencias>{
    return this._http.post<ICompetencias>(`${this.baseUrlApi}/Competencias/GetCompetenciaPagination`,obj)
  }
}
