import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICompetencias } from '../../../interfaces/ICompetencias';
import { CompetenciaService } from '../../../services/competencia.service';
import { IRespuestaSistema } from '../../../interfaces/IRespuestaSistema';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-competencias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-competencias.component.html',
  styleUrl: './add-competencias.component.css'
})
export class AddCompetenciasComponent {
fb = inject(FormBuilder)
CompetenciaService = inject(CompetenciaService);
private toastr = inject(ToastrService)


constructor(public dialogRef:MatDialogRef<AddCompetenciasComponent>){
}
AgregarCompeticionFG = this.fb.group({
  nombre:['',Validators.required],
  encargado:['',Validators.required],
  dia:['',Validators.required],
  hora:['',Validators.required],
  reglas:['',Validators.required],
  descripcion:['',Validators.required],
  division:['',Validators.required]
})

Enviar(){
  console.log(this.AgregarCompeticionFG.value)

  if(this.AgregarCompeticionFG.invalid) return;

  const object: ICompetencias ={
    competenciasId: 0,
    nombre: this.AgregarCompeticionFG.value.nombre!,
    descripcion: this.AgregarCompeticionFG.value.descripcion!,
    reglas: this.AgregarCompeticionFG.value.reglas!,
    encargados: this.AgregarCompeticionFG.value.encargado!,
    oro: 'a',
    plata:'null',
    bronce:'null',
    dia: this.AgregarCompeticionFG.value.dia!,
    hora: this.AgregarCompeticionFG.value.hora!,
    division: this.AgregarCompeticionFG.value.division!
  }

  console.log(this.AgregarCompeticionFG.value)

  this.CompetenciaService.SetCompetencia(object).subscribe({
    next:(data:IRespuestaSistema)=>{
      console.log(data);
      this.toastr.success(data.message, 'Éxito');
    },
    error:(err) => {
      console.log(err);
      this.toastr.error(err.message, 'Error');
    }
  })

}



}
