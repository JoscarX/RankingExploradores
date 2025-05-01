import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sesion.component.html',
  styleUrl: './sesion.component.css'
})
export class SesionComponent {
private usuarioService = inject(UsuarioService)
private fb = inject(FormBuilder)
  constructor(public dialogRef:MatDialogRef<SesionComponent>){

  }

  formSesionUsuario = this.fb.group({
    email:['',Validators.required],
    clave:['',Validators.required]
  })

  closeModal(){
    this.dialogRef.close()
  }

  GetDatosUsuario(){
    if(this.formSesionUsuario.invalid) return;
    const email = this.formSesionUsuario.value.email!
    const clave = this.formSesionUsuario.value.clave!

    this.usuarioService.GetUsuario(email,clave).subscribe({
      next:(data:any) =>{
        console.log(data)
        sessionStorage.setItem("rolUsuario",data.rolUsuario)

        this.dialogRef.close()

      },error:(err) =>{
        console.log(err.message)
      }
    })

  }

}
