import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule  } from 'ng2-charts/ng2-charts';
//pipes
import {PaginatorPipe} from './pipes/pagination.pipe';


//aplicacion
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';

// calificacion componentes
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { ListadoComponent } from './components/calificacion/listado.component';
import { PropuestosComponent } from './components/calificacion/propuestos.component';
import { PersonaComponent } from './components/calificacion/persona.component';
import { ReporteComponent } from './components/calificacion/reporte.component';
import { HojaPersonaComponent } from './components/calificacion/hoja_personal.component';
import { MatrizComponent } from './components/calificacion/matriz.component';
import { EstadisticasComponent } from './components/calificacion/estadisticas.component';

//medica
import { MedicaComponent } from './components/medica/medica.component';
import { JuntasMedicasComponent } from './components/medica/juntas_medicas.component';
import { EstadoComponent } from './components/medica/estado.component';
import { TribunalMedicoComponent } from './components/medica/tribunal_medico.component';
import { FormDisanComponent } from './components/medica/form_disan.component';
import { ClysoComponent } from './components/medica/clyso.component';

import { DisciplinarioComponent } from './components/disciplinario/disciplinario.component';
import { ComandanteComponent } from './components/comandante/comandante.component';

//graficos

import { GraficosComponent } from './components/graficos/grafico.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErrorComponent,
    CalificacionComponent,
    MedicaComponent,
    DisciplinarioComponent,
    ComandanteComponent,
    LoginComponent,
    LogoutComponent,
    PropuestosComponent,
    ListadoComponent,
    PersonaComponent,
    ReporteComponent,
    HojaPersonaComponent,
    MatrizComponent,
    EstadisticasComponent,
    FormDisanComponent,
    JuntasMedicasComponent,
    ClysoComponent,
    TribunalMedicoComponent,
    EstadoComponent,
    GraficosComponent,
    //pipes

    PaginatorPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule,
    ChartsModule

  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
