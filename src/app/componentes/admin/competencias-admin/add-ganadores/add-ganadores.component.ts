import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompetenciaService } from '../../../../services/competencia.service';
import { DestacamentoService } from '../../../../services/destacamento.service';
import { DestacamentosCompetenciasService } from '../../../../services/destacamentos-competencias.service';
import { LogicaGanadoresService } from '../../../../services/logica-ganadores.service';
import { Idestacamento } from '../../../../interfaces/IDestacamentos';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { IAgregarGanadores } from '../../../../interfaces/IAgregarGanadores';

@Component({
  selector: 'app-add-ganadores',
  standalone: true,
  imports: [NgSelectModule,ReactiveFormsModule],
  templateUrl: './add-ganadores.component.html',
  styleUrl: './add-ganadores.component.css'
})
export class AddGanadoresComponent implements OnInit {
  private id:number
  private fb = inject(FormBuilder)
  private CompetenciaService = inject(CompetenciaService)
  private destacamentoCompetenciaService = inject(DestacamentosCompetenciasService)
  private logicaPuntos = inject(LogicaGanadoresService)
  competenciaData : any
  destacamentoListCompetencia : Idestacamento[] = []
  private toastr = inject(ToastrService)

    constructor(public dialogRef:MatDialogRef<AddGanadoresComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
      this.id = data
      console.log(this.id)
    }

  ngOnInit(): void {
    this.GetDestacamentoByCompetencia(this.id);
  }

  GetDestacamentoByCompetencia(id:number){
    this.destacamentoCompetenciaService.GetDestacamentoCompetenciasByCompetencias(id).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.destacamentoListCompetencia = data
        .filter((item: any) => item.destacamento) // evitar nulls
        .map((item: any) => item.destacamento);   // extraer solo el destaca

      },error:(err) =>{
        console.log(err.message)
      }
    })
  }

    AgregarGanadores = this.fb.group({
      primerLugar:['',Validators.required],
      segundoLugar:['',Validators.required],
      tercerLugar:['',Validators.required]
    })

    SetGanadores(){
    if(this.AgregarGanadores.invalid) return;
    
    console.log(this.AgregarGanadores.value)
    
    const object:IAgregarGanadores={
      competenciaId: this.id,
      primerLugar: this.AgregarGanadores.value.primerLugar!,
      segundoLugar: this.AgregarGanadores.value.segundoLugar!,
      tercerLugar: this.AgregarGanadores.value.tercerLugar!
    }
    
    this.logicaPuntos.AgregarGanadores(object).subscribe({
      next: (data:any) =>{
        console.log(data);
        this.toastr.success(data.message, 'Éxito');
        this.dialogRef.close();
      },
      error:(err) =>{
        console.log(err.message);
        this.toastr.error(err.message, 'Error');
      }
    })
    
    }


}
