import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Iparticipantes, IparticipantesCompetenciaPagination, IparticipantesCompetenciaPaginationParameters } from '../interfaces/Iparticipantes';
import { Observable } from 'rxjs';
import { Ipaginacion } from '../interfaces/Ipagination';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
private _http = inject(HttpClient)
private baseUrlApi = environment.baseUrlApi;

  constructor() { }

  GetParticipanesCompetenciaPagination(obj:IparticipantesCompetenciaPaginationParameters):Observable<IparticipantesCompetenciaPagination>{
    return this._http.post<IparticipantesCompetenciaPagination>(`${this.baseUrlApi}/Participantes/GetParticipanesCompetenciaPagination`,obj)
  }

  GetParticipantesPagination(obj:Ipaginacion):Observable<Iparticipantes>{
    return this._http.post<Iparticipantes>(`${this.baseUrlApi}/Participantes/GetParticipantesPagination`,obj)
  }

  GetParticipantesById(id:number):Observable<Iparticipantes>{
    return this._http.get<Iparticipantes>(`${this.baseUrlApi}/Participantes/GetParticipantesById?id=${id}`)
  }

  GetParticipantesByIdCompetencia(id:number):Observable<Iparticipantes>{
    return this._http.get<Iparticipantes>(`${this.baseUrlApi}/Participantes/GetParticipantesByIdCompetencia?id=${id}`)
  }


  SetParticipantes(obj:Iparticipantes):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Participantes/SetParticipantes`,obj)
  }

  UpdateParticipantes(obj:Iparticipantes):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Participantes/UpdateParticipantes`,obj)
  }

  DeleteParticipantes(obj:Iparticipantes):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Participantes/DeleteParticipantes`,obj)
  }
}
