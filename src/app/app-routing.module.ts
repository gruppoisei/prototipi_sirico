import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/insert-persona/homepage/homepage.component';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';

const routes: Routes = [
  {
    path: "", 
    redirectTo: '/login',
    pathMatch: 'full'
  }, 
  {
    path: "insertpersona", 
    component:InsertPersonaComponent
  }, 
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "insertutente",
    component: InsertUtenteComponent
  },
  {
    path: "homepage",
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
