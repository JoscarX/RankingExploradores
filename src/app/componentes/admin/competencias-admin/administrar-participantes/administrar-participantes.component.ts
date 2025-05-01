import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParticipantesService } from '../../../../services/participantes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Iparticipantes, IparticipantesCompetenciaPaginationParameters } from '../../../../interfaces/Iparticipantes';
import Swal from 'sweetalert2';
import { CompetenciaService } from '../../../../services/competencia.service';
import { MatDialog } from '@angular/material/dialog';
import { SetPuntajeArqueroComponent } from '../../../set-puntaje-arquero/set-puntaje-arquero.component';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-administrar-participantes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './administrar-participantes.component.html',
  styleUrls: ['./administrar-participantes.component.css']
})
export class AdministrarParticipantesComponent implements OnInit, OnDestroy {
  usuarioRol = sessionStorage.getItem("rolUsuario");
  private _routeactive = inject(ActivatedRoute);
  private _participanteServices = inject(ParticipantesService);
  private _router = inject(Router);
  private toastr = inject(ToastrService);
  private _CompetenciaService = inject(CompetenciaService);
  private cdr = inject(ChangeDetectorRef);

  dialog = inject(MatDialog)
  competenciaList: any;
  IsSupervivencia: boolean = false;
  IsPasoFirme: boolean = false;
  IsTiroArco: boolean = false;
  idPasofirme: number = 0;
  competenciaName: string = '';

  private table: HTMLElement | null = null;
  private rows: HTMLElement[] = [];
  private headers: HTMLElement[] = [];

  search: string = '';
  pageExisten: number = 1;
  limit: number = 10;
  total: number = 0;
  searchExecute: boolean = true;
  _id: number = 0;
  participanteList: any;

  parameters: IparticipantesCompetenciaPaginationParameters = {
    page: 1,
    limit: this.limit,
    search: this.search,
    competenciaID: Number(this._id)
  };

  paramsformsubscription!: Subscription;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.GetObtenerParticipantes();
    this.GetCompetenciaById();
  }

  ngOnDestroy(): void {
    if (this.paramsformsubscription) this.paramsformsubscription.unsubscribe();
  }

  GetObtenerParticipantes() {
    this.paramsformsubscription = this._routeactive.params.subscribe({
      next: (params) => {
        this._id = params['id'];
        this.parameters.competenciaID = this._id;
        if (!this._id) return;

        this._participanteServices.GetParticipanesCompetenciaPagination(this.parameters).subscribe({
          next: (response) => {
            this.participanteList = response.data.map(p => ({
              nombre: p.nombreCompleto,
              destacamento: p.destacamento?.nombre || 'No asignado',
              destacamentoId: p.destacamentoID,
              participanteId: p.participanteID
            }));

            this.cdr.detectChanges();
            this.initializeTableView();
          },
          error: (err) => {
            this.toastr.error('Error al cargar participantes');
            console.error(err);
          }
        });
      }
    });
  }

  GetCompetenciaById() {
    this._CompetenciaService.GetCompetenciaById(Number(this._id)).subscribe({
      next: (data) => {
        this.competenciaName = data.nombre;

        if (data.nombre === 'Competencia de Supervivencia') {
          this.IsSupervivencia = true;
        } 
         if (data.nombre === 'Paso Firme') {
          this.IsPasoFirme = true;
          this.idPasofirme = Number(data.competenciasId);
        }
        if(data.nombre === 'Tiro con Arco'){
          this.IsTiroArco = true
        }
      },
      error: (err) => console.error(err.message)
    });
  }

  Buscardor() {
    this.parameters.search = this.search.length >= 3 ? this.search : '';
    this._participanteServices.GetParticipanesCompetenciaPagination(this.parameters).subscribe({
      next: (response) => {
        this.participanteList = response.data.map(p => ({
          nombre: p.nombreCompleto,
          destacamento: p.destacamento?.nombre || 'No asignado',
          destacamentoId: p.destacamentoID,
          participanteId: p.participanteID
        }));
        this.cdr.detectChanges();
        this.initializeTableView();
      },
      error: (err) => console.error(err.message)
    });
  }

  limitEntidades() {
    this.parameters.limit = this.limit;
    this.Buscardor();
  }

  pageIncrement() {
    if (this.parameters.page < this.pageExisten) {
      this.parameters.page++;
      this.Buscardor();
    }
  }

  pageDescrement() {
    if (this.parameters.page > 1) {
      this.parameters.page--;
      this.Buscardor();
    }
  }

  DeleteParticipante(destacamentoID: number, participanteID: number) {
    const object: Iparticipantes = {
      participanteID,
      competenciaID: Number(this._id),
      destacamentoID,
      nombreCompleto: '',
      puntosArquero: 0
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._participanteServices.DeleteParticipantes(object).subscribe({
          next: (data: any) => {
            this.toastr.success(data.message, 'Éxito');
            this.GetObtenerParticipantes();
          },
          error: (err) => this.toastr.error(err.message, 'Error')
        });
      }
    });
  }

  SumarPuntosMaximaResistencia(id: number) {
    this._CompetenciaService.SumarPuntosMaximaResistencia(id).subscribe({
      next: (data) => this.toastr.success(data.message, 'Éxito'),
      error: (err) => this.toastr.error(err.message, 'Error')
    });
  }

  opendialogSetPuntaje(id:number){
    this.dialog
    .open(SetPuntajeArqueroComponent, {
      width: '90%',
      panelClass: 'custom-dialog-container',
      data: id
    })
    .afterClosed().subscribe(() => {
     this.GetObtenerParticipantes();
    })
    ;
  }

GoToVerArqueroPuntos(){
  this._router.navigate(['competencia-arquero',this._id])
}

  GoToBack() {
    this._router.navigate(['competencia-admin']);
  }

  GoToBackUsuario() {
    this._router.navigate(['competencias']);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateResponsiveView();
  }

  private initializeTableView(): void {
    setTimeout(() => {
      this.table = this.elRef.nativeElement.querySelector('.custom-table');
      if (this.table) {
        this.rows = Array.from(this.table.querySelectorAll('tbody tr')) as HTMLElement[];
        this.headers = Array.from(this.table.querySelectorAll('thead th')) as HTMLElement[];
  
        this.updateResponsiveView();
        this.initializeToggleButtons();
  
        // Ocultar filas de detalle al inicio
        this.rows.forEach((row) => {
          const detailRow = row.nextElementSibling as HTMLElement | null;
          if (detailRow && detailRow.classList.contains('details-row')) {
            detailRow.style.display = 'none'; // Ocultarlas por defecto
          }
        });
      }
    });
  }

  private updateResponsiveView(): void {
    const isSmallScreen = window.innerWidth <= 768;
    this.rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll('td')) as HTMLElement[];
      cells.forEach((cell, index) => {
        cell.style.display = index < 2 ? 'table-cell' : isSmallScreen ? 'none' : 'table-cell';
        if (isSmallScreen && index >= 2) {
          cell.setAttribute('data-label', this.headers[index]?.innerText || '');
        } else {
          cell.removeAttribute('data-label');
        }
      });
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
}
