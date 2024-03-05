import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';
import { RichiestaAssenzaUtenteComponent } from './pages/richiesta-assenza-utente/richiesta-assenza-utente.component';
import { RichiestaAssenzaSegreteriaComponent } from './pages/richiesta-assenza-segreteria/richiesta-assenza-segreteria.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertUtenteComponent,
    InsertPersonaComponent,
    LoginComponent,
    HomepageComponent,
    RichiestaAssenzaUtenteComponent,
    RichiestaAssenzaSegreteriaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
