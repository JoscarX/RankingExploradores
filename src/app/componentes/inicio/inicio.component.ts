import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Idestacamento } from '../../interfaces/IDestacamentos';
import { DestacamentoService } from '../../services/destacamento.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AgregarDestacamentosComponent } from './agregar-destacamentos/agregar-destacamentos.component';
import { RouterLink } from '@angular/router';
import { SesionComponent } from '../sesion/sesion.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit,OnDestroy,AfterViewInit{

ngOnInit(): void {
this.getAlldestacamentos();
this.GetDestacamentoBetterOro();
this.GetDestacamentoBetterPlata();
this.GetDestacamentoBetterBronce();

this.intervalId = setInterval(() => {
  this.getAlldestacamentos();
  this.GetDestacamentoBetterOro();
  this.GetDestacamentoBetterPlata();
  this.GetDestacamentoBetterBronce();
   // Llamada cada 30s
}, 30000);

}

ngOnDestroy(): void {
  clearInterval(this.intervalId);
}
@ViewChild('videoRef') videoElement!: ElementRef<HTMLVideoElement>

ngAfterViewInit(): void {
  const video = this.videoElement.nativeElement;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.loop = true;
  video.load();
  video.play().catch((err: any) => console.error('Error al reproducir el video:', err));
}

dialog = inject(MatDialog)

usuarioRol = sessionStorage.getItem("rolUsuario");
intervalId: any;
Posicion = 0;
destacamentoList: Idestacamento[] = [];
destacamentoListOro: Idestacamento[] = [];
destacamentoListPlata: Idestacamento[] = [];
destacamentoListBronce: Idestacamento[] = [];
private toastr = inject(ToastrService)

private _destacamentoService = inject(DestacamentoService)

getAlldestacamentos(){
  this._destacamentoService.GetAllDestacamentos().subscribe({
    next:(data : any) =>{
      console.log(data);
      this.destacamentoList = data.sort((a: Idestacamento, b: Idestacamento) => b.total - a.total);
    },error(err) {
      console.log(err.message)
    },
  })
}

GetDestacamentoBetterOro(){
  this._destacamentoService.GetDestacamentoBetterOro().subscribe({
    next:(data:any) =>{
      console.log(data) //Quitar
      this.destacamentoListOro = data
    },
    error(err) {
      console.log(err.message) //Quitar
    },
  })
}

GetDestacamentoBetterPlata(){
  this._destacamentoService.GetDestacamentoBetterPlata().subscribe({
    next:(data:any) =>{
      console.log(data) //Quitar
      this.destacamentoListPlata = data
    },
    error(err) {
      console.log(err.message) //Quitar
    },
  })
}

GetDestacamentoBetterBronce(){
  this._destacamentoService.GetDestacamentoBetterBronce().subscribe({
    next:(data:any) =>{
      console.log(data) //Quitar
      this.destacamentoListBronce = data
    },
    error(err) {
      console.log(err.message) //Quitar
    },
  })
}

opendialogAgregarDestacamento(){
  this.dialog
  .open(AgregarDestacamentosComponent, {
    width: '90%',
  })
  .afterClosed().subscribe((result) => {

      this.getAlldestacamentos(); // 🔁 Recargar los datos
    
  });
 ;
}

opendialogSesion() {
  this.dialog
    .open(SesionComponent, {
      width: '400px',
      height: '370px'
    })
    .afterClosed()
    .subscribe(() => {
      location.reload();
    });
}

EliminarParticipantesCompetencia(id:number){
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esto',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this._destacamentoService.DeleteDestacamentos(id).subscribe({
        next:(data:any) =>{
          console.log(data)
          this.toastr.success(data.message, 'Éxito');
          this.getAlldestacamentos();
          
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
}
