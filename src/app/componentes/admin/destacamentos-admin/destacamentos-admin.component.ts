import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestacamentoService } from '../../../services/destacamento.service';
import { CompetenciaService } from '../../../services/competencia.service';
import { Ipaginacion } from '../../../interfaces/Ipagination';
import { IdestacaementoPagination, Idestacamento } from '../../../interfaces/IDestacamentos';
import { AgregarDestacamentosComponent } from '../../inicio/agregar-destacamentos/agregar-destacamentos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-destacamentos-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './destacamentos-admin.component.html',
  styleUrls: ['./destacamentos-admin.component.css']
})
export class DestacamentosAdminComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private _DestacamentoService = inject(DestacamentoService);
  dialog = inject(MatDialog);


  usuarioRol = sessionStorage.getItem("rolUsuario");
  destacamentoList: Idestacamento[] = [];
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

  private table: HTMLElement | null = null;
  private rows: HTMLElement[] = [];
  private headers: HTMLElement[] = [];

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.GetAllDestacamentos();
  }

  GetAllDestacamentos(): void {
    this._DestacamentoService.GetDestacamentosPagination(this.parameters).subscribe({
      next: (data: any) => {
        this.destacamentoList = data.data;
        this.pageExisten = data.page;
        this.actualizarTabla();
      },
      error: (err) => console.error(err.message)
    });
  }

  Buscardor(): void {
    if (this.search.length >= 3) {
      this.parameters.search = this.search;
      this.parameters.page = 1;
      this.GetAllDestacamentos();
    } else if (!this.searchExecute) {
      this.parameters.search = '';
      this.searchExecute = true;
      this.parameters.page = 1;
      this.GetAllDestacamentos();
    }
  }

  limitEntidades(): void {
    this.parameters.limit = this.limit;
    this.parameters.page = 1;
    this.GetAllDestacamentos();
  }

  pageIncrement(): void {
    if (this.parameters.page < this.pageExisten) {
      this.parameters.page++;
      this.GetAllDestacamentos();
    }
  }

  pageDescrement(): void {
    if (this.parameters.page > 1) {
      this.parameters.page--;
      this.GetAllDestacamentos();
    }
  }

  opendialogAddCompetencia(): void {
    this.dialog.open(AgregarDestacamentosComponent, {
      width: '90%'
    }).afterClosed().subscribe(() => {
      this.GetAllDestacamentos();
    });
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
