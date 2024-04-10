import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { LoginComponent } from './pages/login-box/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/assenza/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { RichiestaAssenzaUtenteComponent } from './pages/assenza/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { CalendarioComponent } from './pages/rapportino/calendario/calendario.component';
import { ModificaPasswordComponent } from './pages/modifica-password/modifica-password.component';
import { authGuard } from './guard/auth.guard';
// import { AggiungiAttivitaComponent } from './pages/rapportino/aggiungi-attivita/aggiungi-attivita.component';
import { GestioneDipendenteComponent } from './pages/gestione-dipendente/gestione-dipendente.component';
import { GestioneContrattoComponent } from './pages/contratto/gestione-contratto/gestione-contratto.component';
import { InsertContrattoComponent } from './pages/contratto/insert-contratto/insert-contratto.component';
import { GestioneRuoloComponent } from './pages/ruolo-utente/gestione-ruolo-funzione/gestione-ruolo.component';
import { GestioneRuoloUtenteComponent } from './pages/ruolo-utente/gestione-ruolo-utente/gestione-ruolo-utente.component';
import { InsertRuoloFunzioneComponent } from './pages/ruolo-utente/insert-ruolo-funzione/insert-ruolo-funzione.component';
import { InsertRuoloUtenteComponent } from './pages/ruolo-utente/insert-ruolo-utente/insert-ruolo-utente.component';
import { LoginBoxComponent } from './pages/login-box/login-box/login-box.component';
import { AssociazioneMFAComponent } from './pages/login-box/associazione-mfa/associazione-mfa.component';
import { ValidatoreMFAComponent } from './pages/login-box/validatore-mfa/validatore-mfa.component';
import { ForgotPasswordComponent } from './pages/login-box/forgot-password/forgot-password.component';
import { SegreteriaComponent } from './pages/segreteria/segreteria.component';
import { InsertClienteComponent } from './pages/contratto/insert-cliente/insert-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'nuova-persona',
    component: InsertPersonaComponent,
  },
  {
    path: 'login',
    component: LoginBoxComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'associazione-mfa', component: AssociazioneMFAComponent },
      { path: 'validatore-mfa', component: ValidatoreMFAComponent },
      { path: 'reset-password', component: ModificaPasswordComponent },
    ],
  },
  {
    path: 'segreteria',
    component: SegreteriaComponent,
    children: [
      {path: 'nuova-persona',component: InsertPersonaComponent},
      { path: 'insert-persona', component: InsertPersonaComponent },
      { path: 'gestione-dipendente', component: GestioneDipendenteComponent },
      { path: 'gestione-contratto', component: GestioneContrattoComponent },
      { path: 'insert-contratto', component: InsertContrattoComponent },
      {path: 'gestione-assenze',component: RichiestaAssenzaSegreteriaComponent},
      // {path:,component:},
      // {path:,component:},
    ],
  },

  {
    path: 'insertutente',
    component: InsertUtenteComponent,
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'richiestaassenzasegreteria',
    component: RichiestaAssenzaSegreteriaComponent,
  },
  {
    path: 'richiestaassenzautente',
    component: RichiestaAssenzaUtenteComponent,
  },
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'rapportino',
    component: CalendarioComponent,
  },
  {
    path: 'modifica-password',
    component: ModificaPasswordComponent,
  },
  {
    path: 'gestione-dipendente',
    component: GestioneDipendenteComponent,
  },
  {
    path: 'gestione-contratto',
    component: GestioneContrattoComponent,
  },
  {
    path: 'nuovo-contratto',
    component: InsertContrattoComponent,
  },
  {
    path: 'gestione-ruolo-funzione',
    component: GestioneRuoloComponent,
  },
  {
    path: 'insert-ruolo-funzione',
    component: InsertRuoloFunzioneComponent,
  },
  {
    path: 'gestione-ruolo-utente',
    component: GestioneRuoloUtenteComponent,
  },
  {
    path: 'insert-ruolo-utente',
    component: InsertRuoloUtenteComponent,
  },
  {
    path: 'insert-cliente',
    component: InsertClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
