import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componentes
import { InicioComponent } from './components/inicio/inicio.component' ;
import { ErrorComponent } from './components/error/error.component' ;
import { CalificacionComponent } from './components/calificacion/calificacion.component' ;
import { DisanComponent } from './components/disan/disan.component' ;
import { DisciplinarioComponent } from './components/disciplinario/disciplinario.component' ;
import { ComandanteComponent } from './components/comandante/comandante.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { LogoutComponent } from './components/login/logout.component' ;
import { ListadoComponent } from './components/calificacion/listado.component' ;
import { PersonaComponent } from './components/calificacion/persona.component' ;
import { ReporteComponent } from './components/calificacion/reporte.component' ;
import { HojaPersonaComponent } from './components/calificacion/hoja_personal.component' ;
import { MatrizComponent } from './components/calificacion/matriz.component' ;


const appRoutes: Routes = [
	{path:'', component: InicioComponent},
	{path:'inicio', component: InicioComponent},
	{path:'calificacion', component: CalificacionComponent},
	{path:'disan', component: DisanComponent},
	{path:'disciplinario', component: DisciplinarioComponent},
	{path:'comandante', component: ComandanteComponent},
	{path:'login', component: LoginComponent},
	{path:'logout', component: LogoutComponent},
	{path:'calificacion/listado', component: ListadoComponent},
	{path:'calificacion/persona', component: PersonaComponent},
	{path:'calificacion/persona/:id', component: HojaPersonaComponent},
	{path:'calificacion/reporte', component: ReporteComponent},
	{path:'calificacion/matriz', component: MatrizComponent},
	{path:'**', component: ErrorComponent},

];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
