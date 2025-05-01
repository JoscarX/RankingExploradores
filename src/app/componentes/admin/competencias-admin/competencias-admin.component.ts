import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { AddCompetenciasComponent } from '../../competencias/add-competencias/add-competencias.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IcompetenciaPaginada, ICompetencias } from '../../../interfaces/ICompetencias';
import { Ipaginacion } from '../../../interfaces/Ipagination';
import { CompetenciaService } from '../../../services/competencia.service';
import { IdestacaementoPagination } from '../../../interfaces/IDestacamentos';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AddGanadoresComponent } from './add-ganadores/add-ganadores.component';
import { VerCompetenciasComponent } from '../../competencias/ver-competencias/ver-competencias.component';
import { EditarCompetenciaComponent } from '../../competencias/editar-competencia/editar-competencia.component';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';  // Importante para los botones de Material
import { MatIconModule } from '@angular/material/icon';      // Para los iconos de Material
import { MatPaginatorModule } from '@angular/material/paginator'; // Para la paginación

@Component({
  selector: 'app-competencias-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './competencias-admin.component.html',
  styleUrls: ['./competencias-admin.component.css']
})
export class CompetenciasAdminComponent implements OnInit {
  usuarioRol = sessionStorage.getItem("rolUsuario");
  dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);
  _CompetenciaService = inject(CompetenciaService);
  toastr = inject(ToastrService);

  competenciaList: any;
  IsPasoFirme: boolean = false;

  search: string = '';
  pageExisten: number = 1;
  limit: number = 10;
  total: number = 0;
  searchExecute: boolean = true;

  parameters: Ipaginacion = {
    page: 1,
    limit: this.limit,
    search: this.search
  };

  // Elementos de la tabla
  private table: HTMLElement | null = null;
  private rows: HTMLElement[] = [];
  private headers: HTMLElement[] = [];

  constructor(private elRef: ElementRef, private route: Router) {}

  ngOnInit(): void {
    this.GetAllCompetencias();
  }

  private actualizarCompetencias(): void {
    this._CompetenciaService.GetCompetenciasPagination(this.parameters).subscribe({
      next: (data: IcompetenciaPaginada | any) => {
        this.competenciaList = data.data;
        this.pageExisten = data.page;
        this.actualizarTabla();
      },
      error: (err) => console.error(err.message)
    });
  }

  GetAllCompetencias(): void {
    this.actualizarCompetencias();
  }

  Buscardor(): void {
    if (this.search.length >= 3) {
      this.parameters.search = this.search;
      this.parameters.page = 1;  // Reseteamos a la primera página cuando se realiza una nueva búsqueda
      this.actualizarCompetencias();
    } else if (!this.searchExecute) {
      this.parameters.search = '';
      this.searchExecute = true;
      this.parameters.page = 1;  // Reseteamos a la primera página cuando se borra la búsqueda
      this.actualizarCompetencias();
    } else {
      return;
    }
  }
  
  limitEntidades(): void {
    this.parameters.limit = this.limit;
    this.parameters.page = 1;  // Reseteamos a la primera página al cambiar el límite
    this.actualizarCompetencias();
  }
  
  pageIncrement(): void {
    if (this.parameters.page < this.pageExisten) {
      this.parameters.page++;
      this.actualizarCompetencias();
    }
  }
  
  pageDescrement(): void {
    if (this.parameters.page > 1) {
      this.parameters.page--;
      this.actualizarCompetencias();
    }
  }
  
  opendialogAddCompetencia(): void {
    this.dialog.open(AddCompetenciasComponent, {
      width: '90%'
    }).afterClosed().subscribe(() => {
      this.GetAllCompetencias();
    });
  }

  opendialogSetGanadores(id: number): void {
    this.dialog.open(AddGanadoresComponent, {
      width: '90%',
      data: id
    }).afterClosed().subscribe(() => {
      this.GetAllCompetencias();
    });
  }

  opendialogVerCompetencia(id: number): void {
    this.dialog.open(VerCompetenciasComponent, {
      width: '90%',
      height: '600px',
      data: id
    }).afterClosed();
  }

  opendialogEditarCompetencia(id: number): void {
    this.dialog.open(EditarCompetenciaComponent, {
      width: '90%',
      data: id
    }).afterClosed().subscribe(() => {
      this.GetAllCompetencias();
    });
  }

  DeleteCompetencia(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CompetenciaService.DeleteCompetencia(id).subscribe({
          next: (data: any) => {
            console.log(data);
            this.toastr.success(data.message, 'Éxito');
            this.GetAllCompetencias();
          },
          error: (err) => {
            this.toastr.error(err.message, 'Error');
          }
        });
      } else {
        console.log('Cancelado');
      }
    });
  }

  GoToAddParticipantes(): void {
    this.route.navigate(['AddParticipantes']);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateResponsiveView();
  }

  private updateResponsiveView(): void {
    const isSmallScreen = window.innerWidth <= 768;

    this.rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll('td')) as HTMLElement[];

      cells.forEach((cell, index) => {
        if (index < 2) {
          cell.style.display = 'table-cell';
        } else {
          cell.style.display = isSmallScreen ? 'none' : 'table-cell';
          if (isSmallScreen) {
            cell.setAttribute('data-label', this.headers[index]?.innerText || 'Sin título');
          } else {
            cell.removeAttribute('data-label');
          }
        }
      });

      if (row.classList.contains('details-row')) {
        row.style.display = 'none';
      }
    });

    this.headers.forEach((header, index) => {
      header.style.display = index < 2 ? 'table-cell' : isSmallScreen ? 'none' : 'table-cell';
    });
  }

  private initializeToggleButtons(): void {
    this.rows.forEach((row) => {
      if (row.classList.contains('collapsible-row')) {
        const toggleButton = row.querySelector('.toggle-button') as HTMLElement | null;

        toggleButton?.addEventListener('click', () => {
          const detailRow = row.nextElementSibling as HTMLElement | null;

          if (detailRow && detailRow.classList.contains('details-row')) {
            const isVisible = detailRow.style.display === 'table-row';
            detailRow.style.display = isVisible ? 'none' : 'table-row';

            toggleButton.innerText = isVisible ? '▼' : '▲';
          }
        });
      }
    });
  }

  private actualizarTabla(): void {
    this.cdr.detectChanges();
    this.table = this.elRef.nativeElement.querySelector('.custom-table');
    if (!this.table) return;

    this.rows = Array.from(this.table.querySelectorAll('tbody tr')) as HTMLElement[];
    this.headers = Array.from(this.table.querySelectorAll('thead th')) as HTMLElement[];

    this.updateResponsiveView();
    this.initializeToggleButtons();
  }
}
