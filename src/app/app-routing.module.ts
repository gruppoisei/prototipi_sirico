import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/assenza/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { RichiestaAssenzaUtenteComponent } from './pages/assenza/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { CalendarioComponent } from './pages/rapportino/calendario/calendario.component';
import { ModificaPasswordComponent } from './pages/modifica-password/modifica-password.component';
import { authGuard } from './guard/auth.guard';
// import { AggiungiAttivitaComponent } from './pages/rapportino/aggiungi-attivita/aggiungi-attivita.component';
import { GestioneDipendenteComponent } from './pages/gestione-dipendente/gestione-dipendente.component';
import { GestioneContrattoComponent } from './pages/gestione-contratto/gestione-contratto.component';
import { InsertContrattoComponent } from './pages/insert-contratto/insert-contratto.component';
import { InsertPersonaProvaComponent } from './pages/insert-persona-prova/insert-persona-prova.component';


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
    path: "nuova-persona-prova", 
    component:InsertPersonaProvaComponent,
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
    path: "nuovo-contratto",
    component: InsertContrattoComponent,
    canActivate: [authGuard]
  },
  {
    path: "gestione-ruolo-funzione",
    component: GestioneRuoloComponent,
    canActivate: [authGuard]
  },
  {
    path: "insert-ruolo-funzione",
    component: InsertRuoloFunzioneComponent,
    canActivate: [authGuard]
  },
  {
    path: "gestione-ruolo-utente",
    component: GestioneRuoloUtenteComponent,
    canActivate: [authGuard]
  },
  {
    path: "insert-ruolo-utente",
    component: InsertRuoloUtenteComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
