import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Iparticipantes } from '../../interfaces/Iparticipantes';
import { ParticipantesService } from '../../services/participantes.service';

@Component({
  selector: 'app-set-puntaje-arquero',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './set-puntaje-arquero.component.html',
  styleUrl: './set-puntaje-arquero.component.css'
})
export class SetPuntajeArqueroComponent implements OnInit{
  private id:number
  private fb = inject(FormBuilder)
  participanteInfo : any
  _ParticipanteService = inject(ParticipantesService)

  private toastr = inject(ToastrService)

    constructor(public dialogRef:MatDialogRef<SetPuntajeArqueroComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
      this.id = data
      console.log(this.id)
    }
  ngOnInit(): void {
this.GetParticipante();
  }

    formSetPuntajeArquero = this.fb.group({
      nombreCompleto: [''],
      puntos:[0],
    })

    GetParticipante(){
      this._ParticipanteService.GetParticipantesById(Number(this.id)).subscribe({
        next:(data) =>{
          console.log(data)
          this.participanteInfo = data
          
          this.formSetPuntajeArquero.patchValue({
            nombreCompleto: data.nombreCompleto,
            puntos: data.puntosArquero
          
          })  
            
          this.toastr.success("Datos obtenidos")
        },
        error:(err)=>{
          this.toastr.error("Ha ocurrido al traer los datos")
        }
      })
    }

    SetPuntosArquero(){
      if(this.formSetPuntajeArquero.invalid) return;

      const object :Iparticipantes = {
        participanteID: this.id,
        nombreCompleto: this.formSetPuntajeArquero.value.nombreCompleto!,
        puntosArquero: this.formSetPuntajeArquero.value.puntos!,
        destacamentoID: this.participanteInfo.destacamentoID,
        competenciaID: this.participanteInfo.competenciaID
      }

      this._ParticipanteService.UpdateParticipantes(object).subscribe({
        next:(data) =>{
          this.toastr.success("Puntaje registrado")
        },
        error:(err) =>{
          this.toastr.error("Error al registrar el puntaje")
        },
      })
    }

    CloseModal(){
      this.dialogRef.close();
    }
}
