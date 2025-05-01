import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ParticipantesService } from '../../services/participantes.service';
import { Iparticipantes } from '../../interfaces/Iparticipantes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competencia-arquero-ver',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competencia-arquero-ver.component.html',
  styleUrl: './competencia-arquero-ver.component.css'
})
export class CompetenciaArqueroVerComponent implements OnInit{
  ngOnInit(): void {
this.GetObtenerParticipanteSupervivencia();
  }
  _routeactive = inject(ActivatedRoute);
paramsformsubscription!: Subscription;
  participantesList:Iparticipantes[] = []
  _participanteService = inject(ParticipantesService)
  private _toastr = inject(ToastrService)

  GetObtenerParticipanteSupervivencia(){
    this.paramsformsubscription = this._routeactive.params.subscribe({
      next: (params) => {
        let id  = params['id'];
        if (!id) return; // Solo continua si hay ID
        this._participanteService.GetParticipantesByIdCompetencia(Number(id)).subscribe({
          next:(data:any) => {
            this.participantesList = data.sort((a:any, b:any) => b.puntos - a.puntos); // Orden descendente
            this._toastr.success("Participantes obtenidos");
          },
          error:(err) =>{
            this._toastr.error("Error al obtener los participantes")
          }
        })
        
      },
      error: (err) => {
        this._toastr.error('Error al obtener los parámetros');
        console.error(err);
      },
    });
  }
}
