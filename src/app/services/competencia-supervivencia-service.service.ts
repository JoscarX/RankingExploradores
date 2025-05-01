import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICompetenciaSupervivencia } from '../interfaces/ICompetenciaSobreviviente';
import { Observable } from 'rxjs';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaSupervivenciaServiceService {
private _http = inject(HttpClient)
private baseUrlApi = environment.baseUrlApi

  constructor() { }

  GetCompetenciaSobrevivienteById(id:number):Observable<ICompetenciaSupervivencia>{
    return this._http.get<ICompetenciaSupervivencia>(`${this.baseUrlApi}/CompetenciaSobreviviente/GetCompetenciaSobrevivienteById?id=${id}`)
  }

  SetCompetenciaSobreviviente(object:ICompetenciaSupervivencia):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/CompetenciaSobreviviente/SetCompetenciaSobreviviente`,object)
  }
}
