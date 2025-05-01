import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CompetenciaService } from './services/competencia.service';
import { CompetenciasComponent } from './componentes/competencias/competencias.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { DestacamentosAdminComponent } from './componentes/admin/destacamentos-admin/destacamentos-admin.component';
import { CompetenciasAdminComponent } from './componentes/admin/competencias-admin/competencias-admin.component';
import { AddParticipantesAdminComponent } from './componentes/admin/competencias-admin/add-participantes-admin/add-participantes-admin.component';
import { AdministrarParticipantesComponent } from './componentes/admin/competencias-admin/administrar-participantes/administrar-participantes.component';
import { CompetenciaArqueroVerComponent } from './componentes/competencia-arquero-ver/competencia-arquero-ver.component';
import { CompetenciaSubrevivienteComponent } from './componentes/admin/competencia-subreviviente/competencia-subreviviente.component';
import { SupervivenciaVerComponent } from './componentes/supervivencia-ver/supervivencia-ver.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'competencias',component:CompetenciasComponent},
    {path:'destacamento-admin',component:DestacamentosAdminComponent},
    {path:'competencia-admin',component:CompetenciasAdminComponent},
    {path:'inicio-sesion',component:SesionComponent},
    {path:'AddParticipantes', component:AddParticipantesAdminComponent},
    {path:'competencia-arquero/:id', component:CompetenciaArqueroVerComponent},
    {path:'mostrar-competidores/:id',component:AdministrarParticipantesComponent},
    {path:'competencia-supervivencia/:id',component:CompetenciaSubrevivienteComponent},
    {path:'competencia-supervivencia-ver/:id',component:SupervivenciaVerComponent}
];
