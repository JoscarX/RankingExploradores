import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ICompetenciaSupervivencia } from '../../../interfaces/ICompetenciaSobreviviente';
import { DestacamentoService } from '../../../services/destacamento.service';
import { Idestacamento } from '../../../interfaces/IDestacamentos';
import { ParticipantesService } from '../../../services/participantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CompetenciaSupervivenciaServiceService } from '../../../services/competencia-supervivencia-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competencia-subreviviente',
  standalone: true,
  imports: [ReactiveFormsModule,NgSelectModule],
  templateUrl: './competencia-subreviviente.component.html',
  styleUrl: './competencia-subreviviente.component.css'
})
export class CompetenciaSubrevivienteComponent implements OnInit{
ngOnInit(): void {
this.GetAllDestacamentos();
this.GetObtenerParticipantes();
}

_routeactive = inject(ActivatedRoute);
_fb = inject(FormBuilder)
_destacamentoService = inject(DestacamentoService)
_participantesService = inject(ParticipantesService)
_competenciaSupervivenciaService = inject(CompetenciaSupervivenciaServiceService)
_id:number = 0
participanteInfo: any
destacamentoList: Idestacamento[] = []
paramsformsubscription!: Subscription;
  private toastr = inject(ToastrService);

  constructor(private elRef: ElementRef,private route:Router) {}
  
GetAllDestacamentos():void{
  this._destacamentoService.GetAllDestacamentos().subscribe({
    next:(data:any) =>{
      console.log(data)
      this.destacamentoList = data
    },
    error:(err) =>{
      console.log(err.message)
    }
  })
}

GetObtenerParticipantes(){
  this.paramsformsubscription = this._routeactive.params.subscribe({
    next: (params) => {
      let id  = params['id'];
      this._id = Number(params['id']);
      if (!id) return; // Solo continua si hay ID



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

formSupervivencia = this._fb.group({
  sobrevivienteID: [0], // Puede usarse para edición, si es nuevo lo puedes omitir
  filtrado: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  purificacion: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
  trabajoEquipo: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  estructuraRefugio: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
  proteccionElementos: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  seguridadEfectividad: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  ejecucionMetodo: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
  orientacionPrecisa: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  explicacionVariacion: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
  encenderFuego: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
  mantenerlo: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  seguridadFuego: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  seguridadHigiene: [0, [Validators.required, Validators.min(0), Validators.max(8)]],
  comidaCocida: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
  CreatividadCoccion: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
  bonus: [0], // sin validaciones
  comentarios: [''], // sin validaciones
  participanteID: [null, [Validators.required]]
});

SetCompetenciaSupervivencia(){
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esto',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {

      this.formSupervivencia.value.participanteID = this.participanteInfo.participanteID
      if(this.formSupervivencia.invalid) return;
    
      const object: ICompetenciaSupervivencia = {
        sobrevivienteID: Number(this.formSupervivencia.value.sobrevivienteID),
        filtrado: Number(this.formSupervivencia.value.filtrado),
        purificacion: Number(this.formSupervivencia.value.purificacion),
        trabajoEquipo: Number(this.formSupervivencia.value.trabajoEquipo),
        estructuraRefugio: Number(this.formSupervivencia.value.estructuraRefugio),
        proteccionElementos: Number(this.formSupervivencia.value.proteccionElementos),
        seguridadEfectividad: Number(this.formSupervivencia.value.seguridadEfectividad),
        ejecucionMetodo: Number(this.formSupervivencia.value.ejecucionMetodo),
        orientacionPrecisa: Number(this.formSupervivencia.value.orientacionPrecisa),
        explicacionVariacion: Number(this.formSupervivencia.value.explicacionVariacion),
        encenderFuego: Number(this.formSupervivencia.value.encenderFuego),
        mantenerlo: Number(this.formSupervivencia.value.mantenerlo),
        seguridadFuego: Number(this.formSupervivencia.value.seguridadFuego),
        seguridadHigiene: Number(this.formSupervivencia.value.seguridadHigiene),
        comidaCocida: Number(this.formSupervivencia.value.comidaCocida),
        creatividadCoccion: Number(this.formSupervivencia.value.CreatividadCoccion),
        bonus: Number(this.formSupervivencia.value.bonus),
        comentarios: String(this.formSupervivencia.value.comentarios),
        participanteID: Number(this.formSupervivencia.value.participanteID)
      };
    
      this._competenciaSupervivenciaService.SetCompetenciaSobreviviente(object).subscribe({
        next:(data) =>{
          console.log(data);
          this.toastr.success(data.message);
        },
        error:(err) =>{
          this.toastr.error('Error al guardar los datos');
        }
      })

      console.log('Confirmado');
    } else {
      console.log('Cancelado');
    }
  });
 
}
GoToBack(){
  this.route.navigate(['competencia-admin'])
}

}
