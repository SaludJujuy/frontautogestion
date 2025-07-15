import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { PrestadorComponent } from './pagina/prestador/prestador.component';
import { TramiteComponent } from './pagina/tramite/tramite.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'tramite', component: TramiteComponent},
  {path: 'prestador', component: PrestadorComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
