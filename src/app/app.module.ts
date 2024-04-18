import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login-box/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { CalendarioComponent } from './pages/rapportino/calendario/calendario.component';
import { GiornoCalendarioComponent } from './pages/rapportino/giorno-calendario/giorno-calendario.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichiestaAssenzaUtenteComponent } from './pages/assenza/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/assenza/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { MenuComponent } from './menu/menu.component';
import { ForgotPasswordComponent } from './pages/login-box/forgot-password/forgot-password.component';
import { ResponseDialogComponent } from './ui/response-dialog/response-dialog/response-dialog.component';
import { ErrorLoginDialogComponent } from './ui/error-login-dialog/error-login-dialog.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ResponseResetPasswordDialogComponent } from './ui/response-reset-password-dialog/response-reset-password-dialog.component';
import { ModificaPasswordComponent } from './pages/modifica-password/modifica-password.component';
import { MatIconModule } from '@angular/material/icon';
import { NewPasswordResponseDialogComponent } from './ui/new-password-response-dialog/new-password-response-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { GestioneDipendenteComponent } from './pages/gestione-dipendente/gestione-dipendente.component';
import { GestioneContrattoComponent } from './pages/contratto/gestione-contratto/gestione-contratto.component';
import { InsertContrattoComponent } from './pages/contratto/insert-contratto/insert-contratto.component';
import { MessageResponseDialogComponent } from './ui/message-response-dialog/message-response-dialog.component';
import { DeleteDipendenteDialogComponent } from './pages/delete-dipendente-dialog/delete-dipendente-dialog.component';
import { DeleteDipendenteResponseDialogComponent } from './ui/delete-dipendente-response-dialog/delete-dipendente-response-dialog.component';
import { OrdinaGiorniPipe } from "./pages/rapportino/ordina-giorni.pipe";
import { FooterComponent } from './footer/footer.component';
import { GestioneRuoloComponent } from './pages/ruolo-utente/gestione-ruolo-funzione/gestione-ruolo.component';
import { InsertRuoloFunzioneComponent } from './pages/ruolo-utente/insert-ruolo-funzione/insert-ruolo-funzione.component';
import { GestioneRuoloUtenteComponent } from './pages/ruolo-utente/gestione-ruolo-utente/gestione-ruolo-utente.component';
import { InsertRuoloUtenteComponent } from './pages/ruolo-utente/insert-ruolo-utente/insert-ruolo-utente.component';
import { LoginBoxComponent } from './pages/login-box/login-box/login-box.component';
import { ValidatoreMFAComponent } from './pages/login-box/validatore-mfa/validatore-mfa.component';
import { AssociazioneMFAComponent } from './pages/login-box/associazione-mfa/associazione-mfa.component';
import { DialogCercaPersonaComponent } from './pages/dialog-cerca-persona/dialog-cerca-persona.component';
import { SegreteriaComponent } from './pages/segreteria/segreteria.component';
import { InsertClienteComponent } from './pages/contratto/insert-cliente/insert-cliente.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { CronologiaDistaccoComponent } from './pages/contratto/cronologia-distacco/cronologia-distacco.component';
import { SelezionaRuoloDialogComponent } from './pages/login-box/seleziona-ruolo-dialog/seleziona-ruolo-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { ProgettoComponent } from './pages/progetto/progetto.component';
import { VisualizzaProgettoComponent } from './pages/progetto/visualizza-progetto/visualizza-progetto.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingComponent } from './ui/loading/loading.component';
import { LoadingInterceptor } from './ui/loading/loading.interceptor';
import { GestioneFileComponent } from './pages/gestione-file/gestione-file.component';

@NgModule({
    declarations: [
        AppComponent,
        InsertUtenteComponent,
        InsertPersonaComponent,
        LoginComponent,
        HomepageComponent,
        CalendarioComponent,
        GiornoCalendarioComponent,
        RichiestaAssenzaUtenteComponent,
        RichiestaAssenzaSegreteriaComponent,
        MenuComponent,
        ForgotPasswordComponent,
        ResponseDialogComponent,
        ErrorLoginDialogComponent,
        ResponseResetPasswordDialogComponent,
        ModificaPasswordComponent,
        NewPasswordResponseDialogComponent,
        GestioneDipendenteComponent,
        GestioneContrattoComponent,
        InsertContrattoComponent,
        MessageResponseDialogComponent,
        DeleteDipendenteDialogComponent,
        DeleteDipendenteResponseDialogComponent,
        FooterComponent,
        GestioneRuoloComponent,
        InsertRuoloFunzioneComponent,
        GestioneRuoloUtenteComponent,
        InsertRuoloUtenteComponent,
        LoginBoxComponent,
        ValidatoreMFAComponent,
        AssociazioneMFAComponent,
        DialogCercaPersonaComponent,
        SegreteriaComponent,
        InsertClienteComponent,
        CronologiaDistaccoComponent,
        SelezionaRuoloDialogComponent,
        ProgettoComponent,
        VisualizzaProgettoComponent,
        LoadingComponent,
        SelezionaRuoloDialogComponent,
        GestioneFileComponent
    ],
    providers: [
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatBadgeModule,
        MatButtonModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        OrdinaGiorniPipe,
        MatCheckboxModule,
        MatExpansionModule
    ]
})
export class AppModule { }
