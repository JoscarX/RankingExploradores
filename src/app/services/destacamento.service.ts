import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Idestacamento } from '../interfaces/IDestacamentos';
import { IRespuestaSistema } from '../interfaces/IRespuestaSistema';
import { Ipaginacion } from '../interfaces/Ipagination';

@Injectable({
  providedIn: 'root'
})
export class DestacamentoService {
  private _http = inject(HttpClient);
  private baseUrlApi = environment.baseUrlApi;

  constructor() { }

  GetAllDestacamentos():Observable<Idestacamento>{
    return this._http.get<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetAllDestacamentos`)
  }
  GetDestacamentoBetterOro():Observable<Idestacamento>{
    return this._http.get<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetDestacamentoBetterOro`)
  }
  GetDestacamentoBetterPlata():Observable<Idestacamento>{
    return this._http.get<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetDestacamentoBetterPlata`)
  }
  GetDestacamentoBetterBronce():Observable<Idestacamento>{
    return this._http.get<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetDestacamentoBetterBronce`)
  }
  GetDestacamentosById(id:number):Observable<Idestacamento>{
    return this._http.get<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetDestacamentosById?id=${id}`)
  }
  SetDestacamentos(object:Idestacamento):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Destacamento/SetDestacamentos`,object)
  }
  UpdateDestacamentos(object:Idestacamento):Observable<IRespuestaSistema>{
    return this._http.post<IRespuestaSistema>(`${this.baseUrlApi}/Destacamento/UpdateDestacamentos`,object)
  }
  DeleteDestacamentos(id:number):Observable<IRespuestaSistema>{
    return this._http.get<IRespuestaSistema>(`${this.baseUrlApi}/Destacamento/DeleteDestacamentos?id=${id}`)
  }
  GetDestacamentosPagination(object: Ipaginacion):Observable<Idestacamento>{
    return this._http.post<Idestacamento>(`${this.baseUrlApi}/Destacamento/GetDestacamentosPagination`,object)
  }
}
