import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompetenciaService } from '../../../services/competencia.service';
import { ICompetencias } from '../../../interfaces/ICompetencias';
import { CommonModule } from '@angular/common';
import { IDestacamentosCompetencias, ISetDestacamentoCompetencias } from '../../../interfaces/IDestacamentosCompetencias';
import { DestacamentosCompetenciasService } from '../../../services/destacamentos-competencias.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ver-competencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-competencias.component.html',
  styleUrl: './ver-competencias.component.css'
})
export class VerCompetenciasComponent implements OnInit{

  usuarioRol = sessionStorage.getItem("rolUsuario")
  private _CompetenciaService = inject(CompetenciaService)
  private _DestacamentosCompetenciaService = inject(DestacamentosCompetenciasService)
  private id: number = 0
  competencia : any 
  destacamentoPartList:IDestacamentosCompetencias[] = []
  private toastr = inject(ToastrService)

  constructor(public dialogRef:MatDialogRef<VerCompetenciasComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
    this.id = data
    console.log(this.id)
  }

  ngOnInit(): void {
    this.GetCompetenciasById(this.id);
    this.GetDestacamentoCompetenciaById(this.id);
  }

  GetCompetenciasById(id:number){
    this._CompetenciaService.GetCompetenciaById(id).subscribe({
      next:(data:any)=>{
        console.log(data); //BORRAR
        this.competencia = data
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }

  GetDestacamentoCompetenciaById(id:number){
    this._DestacamentosCompetenciaService.GetDestacamentoCompetenciasByCompetencias(id).subscribe({
      next:(data:any)=>{
        console.log(data) //Borrar
        this.destacamentoPartList = data
        
      },
      error(err) {
        console.log(err.message)
      },
    })
  }

  EliminarParticipantesCompetencia(idCompetencia:number){
    const object: ISetDestacamentoCompetencias ={
      destacamentoId: idCompetencia,
      competenciaId: this.id
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._DestacamentosCompetenciaService.DeleteDestacamentoCompetencia(object).subscribe({
          next:(data:any) => {
            console.log(data);
            this.toastr.success(data.message, 'Éxito');
            this.GetDestacamentoCompetenciaById(this.id);

          },error:(err)=>{
            this.toastr.error(err.message, 'Error');
          }
        })
        // Acción a ejecutar si confirma
        console.log('Confirmado');
      } else {
        console.log('Cancelado');
      }
    });
  }

  closeDialog(){

    
    this.dialogRef.close();
  }
  

}
