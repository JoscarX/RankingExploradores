import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICompetencias } from '../../../interfaces/ICompetencias';
import { CompetenciaService } from '../../../services/competencia.service';
import { IRespuestaSistema } from '../../../interfaces/IRespuestaSistema';
import { DestacamentoService } from '../../../services/destacamento.service';
import { Idestacamento } from '../../../interfaces/IDestacamentos';
import { CommonModule } from '@angular/common';
import { DestacamentosCompetenciasService } from '../../../services/destacamentos-competencias.service';
import { LogicaGanadoresService } from '../../../services/logica-ganadores.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-competencia',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './editar-competencia.component.html',
  styleUrl: './editar-competencia.component.css'
})
export class EditarCompetenciaComponent implements OnInit{
  private id:number
  private fb = inject(FormBuilder)
  private CompetenciaService = inject(CompetenciaService)
  private destacamentoServices = inject(DestacamentoService)
  private destacamentoCompetenciaService = inject(DestacamentosCompetenciasService)
  private logicaPuntos = inject(LogicaGanadoresService)
  competenciaData : any
  destacamentoList : Idestacamento[] = []
  destacamentoListCompetencia : Idestacamento[] = []
  private toastr = inject(ToastrService)

    constructor(public dialogRef:MatDialogRef<EditarCompetenciaComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
      this.id = data
      console.log(this.id)
    }

  ngOnInit(): void {
    this.GetCompetenciasById(this.id);

  }

    GetCompetenciasById(id:number){
      this.CompetenciaService.GetCompetenciaById(id).subscribe({
        next:(data:any) => {
          console.log(data);
          this.competenciaData = data
          this.EditarCompeticionFG.patchValue({
            nombre: data.nombre,
            encargado: data.encargados,
            dia: data.dia,
            hora: data.hora,
            reglas: data.reglas,
            descripcion: data.descripcion,
            division: data.division
            
            
          })
        },
        error(err) {
          console.log(err.message)
        },
      })
    }


EditarCompeticionFG = this.fb.group({
  nombre:['',Validators.required],
  encargado:['',Validators.required],
  dia:['',Validators.required],
  hora:['',Validators.required],
  reglas:['',Validators.required],
  descripcion:['',Validators.required],
  division:['',Validators.required]
})


EditarCompetencias(){
  console.log(this.EditarCompeticionFG.value)

  if(this.EditarCompeticionFG.invalid) return;

  const object: ICompetencias ={
    competenciasId: this.id,
    nombre: this.EditarCompeticionFG.value.nombre!,
    descripcion: this.EditarCompeticionFG.value.descripcion!,
    reglas: this.EditarCompeticionFG.value.reglas!,
    encargados: this.EditarCompeticionFG.value.encargado!,
    oro: 'a',
    plata:'null',
    bronce:'null',
    dia: this.EditarCompeticionFG.value.dia!,
    hora: this.EditarCompeticionFG.value.hora!,
    division: this.EditarCompeticionFG.value.division!
  }

  console.log(this.EditarCompeticionFG.value)

  this.CompetenciaService.UpdateCompetencia(object).subscribe({
    next:(data:IRespuestaSistema)=>{
      console.log(data.message + "Editado");
      this.toastr.success(data.message, 'Éxito');
      this.dialogRef.close()

    },
    error:(err) => {
      console.log(err);
      this.toastr.error(err.message, 'Error');
    }
  })

}


}
