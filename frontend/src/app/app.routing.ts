import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//aplicacion

import { InicioComponent } from './components/inicio/inicio.component' ;
import { ErrorComponent } from './components/error/error.component' ;
import { LoginComponent } from './components/login/login.component' ;
import { LogoutComponent } from './components/login/logout.component' ;
// calificacion

import { CalificacionComponent } from './components/calificacion/calificacion.component' ;
import { ListadoComponent } from './components/calificacion/listado.component' ;
import { PersonaComponent } from './components/calificacion/persona.component' ;
import { ReporteComponent } from './components/calificacion/reporte.component' ;
import { HojaPersonaComponent } from './components/calificacion/hoja_personal.component' ;
import { MatrizComponent } from './components/calificacion/matriz.component' ;
import { EstadisticasComponent } from './components/calificacion/estadisticas.component' ;
// Medica

import { MedicaComponent } from './components/medica/medica.component' ;
import { JuntasMedicasComponent } from './components/medica/juntas_medicas.component' ;
import { EstadoComponent } from './components/medica/estado.component' ;
import { TribunalMedicoComponent } from './components/medica/tribunal_medico.component' ;

//juridica
import { DisciplinarioComponent } from './components/disciplinario/disciplinario.component' ;

//comandante
import { ComandanteComponent } from './components/comandante/comandante.component' ;

const appRoutes: Routes = [
	{path:'', component: InicioComponent},
	{path:'inicio', component: InicioComponent},
	{path:'calificacion', component: CalificacionComponent},
	{path:'medica', component: MedicaComponent},
	{path:'disciplinario', component: DisciplinarioComponent},
	{path:'comandante', component: ComandanteComponent},
	{path:'login', component: LoginComponent},
	{path:'logout', component: LogoutComponent},
	{path:'calificacion/listado', component: ListadoComponent},
	{path:'calificacion/persona', component: PersonaComponent},
	{path:'calificacion/persona/:id', component: HojaPersonaComponent},
	{path:'calificacion/reporte', component: ReporteComponent},
	{path:'calificacion/matriz', component: MatrizComponent},
	{path:'medica/juntas_medicas', component: JuntasMedicasComponent},
	{path:'medica/juntas_medicas/:id', component: JuntasMedicasComponent},
	{path:'medica/estado_salud', component: EstadoComponent},
	{path:'medica/tribunal_medico', component: TribunalMedicoComponent},
	{path:'**', component: ErrorComponent},

];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
