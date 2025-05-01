import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DestacamentoService } from '../../../services/destacamento.service';
import { Idestacamento } from '../../../interfaces/IDestacamentos';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agregar-destacamentos',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './agregar-destacamentos.component.html',
  styleUrl: './agregar-destacamentos.component.css'
})
export class AgregarDestacamentosComponent {

  private fb = inject(FormBuilder)
  private destacamentoService = inject(DestacamentoService)
  private toastr = inject(ToastrService)

  constructor(public dialogRef:MatDialogRef<AgregarDestacamentosComponent>){

  }

  formDestacamento = this.fb.group({
    nombre:[''],
    numero:['']
  })

  AddDestacamento(){
    if(this.formDestacamento.invalid) return;
  
    const object:Idestacamento={
      destacamentoId: 0,
      nombre:this.formDestacamento.value.nombre!,
      numero:this.formDestacamento.value.numero!,
      oro: 0,
      plata: 0,
      bronce:0,
      total:0
    }

    this.destacamentoService.SetDestacamentos(object).subscribe({
      next:(data : any)=>{
        console.log(data)
        this.toastr.success(data.message, 'Éxito');
        this.dialogRef.close();
      },
      error:(err) =>{
        console.log(err)
        this.toastr.error(err.message, 'Error');
      }
    })
  }


}
