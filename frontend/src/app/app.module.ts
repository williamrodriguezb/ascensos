import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ErrorComponent } from './components/error/error.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { DisanComponent } from './components/disan/disan.component';
import { DisciplinarioComponent } from './components/disciplinario/disciplinario.component';
import { ComandanteComponent } from './components/comandante/comandante.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { ListadoComponent } from './components/calificacion/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErrorComponent,
    CalificacionComponent,
    DisanComponent,
    DisciplinarioComponent,
    ComandanteComponent,
    LoginComponent,
    LogoutComponent,
    ListadoComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
