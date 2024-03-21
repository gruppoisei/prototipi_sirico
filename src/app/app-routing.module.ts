import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { RichiestaAssenzaUtenteComponent } from './pages/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { CalendarioComponent } from './pages/rapportino/calendario/calendario.component';
import { ModificaPasswordComponent } from './pages/modifica-password/modifica-password.component';
import { authGuard } from './guard/auth.guard';
// import { AggiungiAttivitaComponent } from './pages/rapportino/aggiungi-attivita/aggiungi-attivita.component';
import { GestioneDipendenteComponent } from './pages/gestione-dipendente/gestione-dipendente.component';
import { GestioneContrattoComponent } from './pages/gestione-contratto/gestione-contratto.component';
import { InsertContrattoComponent } from './pages/insert-contratto/insert-contratto.component';

const routes: Routes = [
  {
    path: "", 
    redirectTo: '/login',
    pathMatch: 'full'
  }, 
  {
    path: "nuova-persona", 
    component:InsertPersonaComponent,
    canActivate: [authGuard]
  }, 
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "insertutente",
    component: InsertUtenteComponent,
    canActivate: [authGuard]
  },
  {
    path: "homepage",
    component: HomepageComponent
  },
  {
    path: "richiestaassenzasegreteria",
    component:  RichiestaAssenzaSegreteriaComponent,
    canActivate: [authGuard]
  },
  {
    path: "richiestaassenzautente",
    component:  RichiestaAssenzaUtenteComponent,
    canActivate: [authGuard]
  },
  {
    path: "",
    component: HomepageComponent 
  },

  {
    path: "rapportino",
    component: CalendarioComponent,
    canActivate: [authGuard]
  },

  {
    path: "modifica-password",
    component: ModificaPasswordComponent,
    canActivate: [authGuard]
  },
  {
    path: "gestione-dipendente",
    component: GestioneDipendenteComponent,
    canActivate: [authGuard]
  },
  {
    path: "gestione-contratto",
    component: GestioneContrattoComponent,
    canActivate: [authGuard]
  },
  {
    path: "nuovo-contratto/:id",
    component: InsertContrattoComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
