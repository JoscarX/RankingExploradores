import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SesionComponent } from '../sesion/sesion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink,RouterModule,CommonModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('sidebar') sidebar!: ElementRef;
  
  usuarioRol = sessionStorage.getItem("rolUsuario");
  dialog = inject(MatDialog)

  constructor(private renderer: Renderer2) {}

  toggleMenu(): void {
    this.toggleClass(this.sidebar.nativeElement, 'menu-toggle');
    this.toggleClass(this.menu.nativeElement, 'menu-toggle');
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
  closeModal(){
    this.dialog.closeAll()
  }

  private toggleClass(element: HTMLElement, className: string): void {
    if (element.classList.contains(className)) {
      this.renderer.removeClass(element, className);
    } else {
      this.renderer.addClass(element, className);
    }
  }
}
