import { Component, inject, OnInit } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { Idestacamento } from '../../../../interfaces/IDestacamentos';
import { DestacamentoService } from '../../../../services/destacamento.service';
import { CompetenciaService } from '../../../../services/competencia.service';
import { ICompetencias } from '../../../../interfaces/ICompetencias';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParticipantesService } from '../../../../services/participantes.service';
import { Iparticipantes } from '../../../../interfaces/Iparticipantes';
import Swal from 'sweetalert2';
import { IRespuestaSistema } from '../../../../interfaces/IRespuestaSistema';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-participantes-admin',
  standalone: true,
  imports: [NgSelectModule,ReactiveFormsModule],
  templateUrl: './add-participantes-admin.component.html',
  styleUrl: './add-participantes-admin.component.css'
})
export class AddParticipantesAdminComponent implements OnInit {
  ngOnInit(): void {
    this.GetAllDestacamentos();
    this.GetAllCompetencia();
  }

  _participanteService = inject(ParticipantesService)
  _destacamentoService = inject(DestacamentoService)
  _competenciaService = inject(CompetenciaService)
  destacamentoList: Idestacamento[] = []
  competenciaList:ICompetencias[] = []
  _fb = inject(FormBuilder)
  _router = inject(Router)

  formSetParticipante = this._fb.group({
    name:['',Validators.required],
    destacamentoId:['',Validators.required],
    competenciaId:['',Validators.required]
  })

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

  GetAllCompetencia():void{
    this._competenciaService.GetAllCompetencia().subscribe({
      next:(data:any) =>{
        console.log(data)
        this.competenciaList = data
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }

  SetParticipantes(){


    console.log(this.formSetParticipante.value)

     Swal.fire({
          title: '¿Estás seguro?',
          text: 'Por favor confirme los datos',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, guardar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
    
            const objec:Iparticipantes = {
              participanteID : 1,
              nombreCompleto: this.formSetParticipante.value.name!,
              puntosArquero:0,
              destacamentoID: Number(this.formSetParticipante.value.destacamentoId!,),
              competenciaID: Number(this.formSetParticipante.value.competenciaId!)
            }
      
            this._participanteService.SetParticipantes(objec).subscribe({
              next:(data:IRespuestaSistema) =>{
                console.log(data.message)
              },
              error: (err) =>{
                console.log(err.message)
              }
            })
      
            // Acción a ejecutar si confirma
            console.log('Confirmado');
          } else {
            console.log('Cancelado');
          }
        });

      
  }

  GoToBack(){
    this._router.navigate(['competencia-admin'])
  }
}
