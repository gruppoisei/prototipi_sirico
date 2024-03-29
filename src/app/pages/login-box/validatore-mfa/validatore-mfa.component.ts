import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';

@Component({
  selector: 'app-validatore-mfa',
  templateUrl: './validatore-mfa.component.html',
  styleUrl: './validatore-mfa.component.scss'
})
export class ValidatoreMFAComponent {

  expire1week=false

  codiceValidatore=""


  constructor(public auth : AuthenticationService,private router:Router){}
  
    ConfermaMFA() {
     this.auth.ConfermaMFA(this.codiceValidatore,this.expire1week)
        .subscribe((res) => {
          console.log(res)
          this.auth.status = res.status
  
  
         //se utente ha correttamente verificato il codice redirect dentro il sito e creo variabile utente loggato
        if(this.auth.status == statoAccesso.utenteLoggato)
        {
          this.auth.utente = res.body
          console.log(this.auth.utente)

          this.router.navigate(["/homepage"])
        }
        //se errore redirect al login
        else{
          alert("errore inserimento codice verifica")
        }
          
  
        });
    }

}