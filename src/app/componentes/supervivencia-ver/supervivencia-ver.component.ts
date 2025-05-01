import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetenciaSupervivenciaServiceService } from '../../services/competencia-supervivencia-service.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParticipantesService } from '../../services/participantes.service';

@Component({
  selector: 'app-supervivencia-ver',
  standalone: true,
  imports: [],
  templateUrl: './supervivencia-ver.component.html',
  styleUrl: './supervivencia-ver.component.css'
})
export class SupervivenciaVerComponent implements OnInit{
  ngOnInit(): void {
this.GetObtenerParticipanteSupervivencia();
  }
  participanteInfo: any
  _participantesService = inject(ParticipantesService)
paramsformsubscription!: Subscription;
_competenciaSupervivenciaService = inject(CompetenciaSupervivenciaServiceService)
_routeactive = inject(ActivatedRoute);
SupervivenciaInfo:any
  private toastr = inject(ToastrService);


  GetObtenerParticipanteSupervivencia(){
    this.paramsformsubscription = this._routeactive.params.subscribe({
      next: (params) => {
        let id  = params['id'];
        if (!id) return; // Solo continua si hay ID
  
  
  
        this._competenciaSupervivenciaService.GetCompetenciaSobrevivienteById(Number(id)).subscribe({
          next: (data:any) => {
            console.log(data)
            this.SupervivenciaInfo = data
          },
          error: (err) => {
            this.toastr.error('Error al cargar participante');
            console.error(err);
          },
        });

        this._participantesService.GetParticipantesById(Number(id)).subscribe({
          next: (data:any) => {
            console.log(data)
            this.participanteInfo = data
          },
          error: (err) => {
            this.toastr.error('Error al cargar participante');
            console.error(err);
          },
        });
      },
      error: (err) => {
        this.toastr.error('Error al obtener los parámetros');
        console.error(err);
      },
    });
  }

  get totalPurificacion(): number {
    return (
      (this.SupervivenciaInfo.filtrado || 0) +
      (this.SupervivenciaInfo.purificacion || 0) +
      (this.SupervivenciaInfo.trabajoEquipo || 0)
    );
  }

  get totalRefugio(): number {
    return (
      (this.SupervivenciaInfo.estructuraRefugio || 0) +
      (this.SupervivenciaInfo.proteccionElementos || 0) +
      (this.SupervivenciaInfo.seguridadEfectividad || 0)
    );
  }

  get totalOrientacion(): number {
    return (
      (this.SupervivenciaInfo.ejecucionMetodo || 0) +
      (this.SupervivenciaInfo.orientacionPrecisa || 0) +
      (this.SupervivenciaInfo.explicacionVariacion || 0)
    );
  }

  get totalFogata(): number {
    return (
      (this.SupervivenciaInfo.encenderFuego || 0) +
      (this.SupervivenciaInfo.mantenerlo || 0) +
      (this.SupervivenciaInfo.seguridadFuego || 0)
    );
  }

  get totalCoccion(): number {
    return (
      (this.SupervivenciaInfo.seguridadHigiene || 0) +
      (this.SupervivenciaInfo.comidaCocida || 0) +
      (this.SupervivenciaInfo.creatividadCoccion || 0)
    );
  }

  get puntajeFinal(): number {
    return (
      this.totalPurificacion +
      this.totalRefugio +
      this.totalOrientacion +
      this.totalFogata +
      this.totalCoccion +
      (this.SupervivenciaInfo.bonus || 0)
    );
  }
}
