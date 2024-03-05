import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsertUtenteComponent } from './pages/insert-utente/insert-utente.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/insert-persona/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertUtenteComponent,
    InsertPersonaComponent,
    LoginComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
