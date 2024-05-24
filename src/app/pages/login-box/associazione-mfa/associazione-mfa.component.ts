import { Component } from '@angular/core';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-associazione-mfa',
  templateUrl: './associazione-mfa.component.html',
  styleUrl: './associazione-mfa.component.scss'
})
export class AssociazioneMFAComponent {
  codiceValidatore=""
  expire1week=false
  constructor(public auth:AuthenticationService,private router:Router){}

  ConfermaMFA() {
    this.auth.ConfermaMFA(this.codiceValidatore,this.expire1week)
       .subscribe((res) => {
         
         this.auth.status = res.status
 
         //se utente ha correttamente verificato il codice redirect dentro il sito e creo variabile utente loggato
         if(this.auth.status == statoAccesso.utenteLoggato)
         {
           this.auth.utente = res.body
           console.log(this.auth.utente)
 
          this.router.navigate(["/Home"])
         }
         //se errore redirect al login
         else{
           alert("errore inserimento codice verifica")
         }
         
         
 
       });
   }

}
