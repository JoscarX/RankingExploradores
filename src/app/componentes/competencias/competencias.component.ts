import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompetenciasComponent } from './add-competencias/add-competencias.component';
import { CompetenciaService } from '../../services/competencia.service';
import { ICompetencias } from '../../interfaces/ICompetencias';
import { CommonModule } from '@angular/common';
import { VerCompetenciasComponent } from './ver-competencias/ver-competencias.component';
import { EditarCompetenciaComponent } from './editar-competencia/editar-competencia.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { SesionComponent } from '../sesion/sesion.component';
import { RouterLink } from '@angular/router';
import { CompetenciaArqueroVerComponent } from '../competencia-arquero-ver/competencia-arquero-ver.component';


@Component({
  selector: 'app-competencias',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './competencias.component.html',
  styleUrl: './competencias.component.css'
})
export class CompetenciasComponent implements OnInit{
ngOnInit(): void {
  this.getAllCompetencias();
}

usuarioRol = sessionStorage.getItem("rolUsuario");
dialog = inject(MatDialog)
CompetenciaService = inject(CompetenciaService)
competenciaList: ICompetencias[] =[]
private toastr = inject(ToastrService)


opendialogAddCompetencia(){
  this.dialog
  .open(AddCompetenciasComponent, {
    width: '400px',
    height: '200px', // Alto fijo
    panelClass: 'custom-dialog-container'
  })
  .afterClosed().subscribe(() => {
    this.getAllCompetencias();
  })
 ;
}

opendialogVerCompetencia(id:number){
  this.dialog
  .open(VerCompetenciasComponent, {
    width: '400px',
    height:'600px',
    data: id
  })
  .afterClosed()
 ;
}

opendialogVerCompetenciArquero(id:number){
  this.dialog
  .open(CompetenciaArqueroVerComponent, {
    width: '95vw',
    maxWidth: '100vw',
    height: 'auto',
    maxHeight: '95vh',
    data: id,
    panelClass: 'responsive-dialog'
  })
  .afterClosed()
 ;
}

opendialogEditarCompetencia(id:number){
  this.dialog
  .open(EditarCompetenciaComponent, {
    width: '90%',
    data: id
  })
  .afterClosed().subscribe(() => {
    this.getAllCompetencias();
  })
 ;
}

getAllCompetencias(){
  this.CompetenciaService.GetAllCompetencia().subscribe({
    next:(data:any) =>{
      console.log(data);
      this.competenciaList = data;
    },error(err) {
      console.log(err.message)
    },
  })
}

DeleteCompetencia(id:number){

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esto',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.CompetenciaService.DeleteCompetencia(id).subscribe({
        next:(data:any) =>{
          console.log(data)
          this.toastr.success(data.message, 'Éxito');
          this.getAllCompetencias();
          
        },error:(err) =>{
          this.toastr.error(err.message, 'Error');
        }
      })
      console.log('Confirmado');
    } else {
      console.log('Cancelado');
    }
  });

}

opendialogSesion(){
  this.dialog
  .open(SesionComponent, {
    width: '400px',
    height: '370px'
  })
  .afterClosed()
 ;
}



}
