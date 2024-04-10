import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { SelezionaRuoloComponent } from '../seleziona-ruolo/seleziona-ruolo.component';

@Component({
  selector: 'app-validatore-mfa',
  templateUrl: './validatore-mfa.component.html',
  styleUrl: './validatore-mfa.component.scss'
})
export class ValidatoreMFAComponent {

  expire1week=false

  codiceValidatore=""


  constructor(public auth : AuthenticationService,private router:Router,public dialog: MatDialog){}
  
    ConfermaMFA() {
     this.auth.ConfermaMFA(this.codiceValidatore,this.expire1week)
        .subscribe((res) => {
          console.log(res)
          this.auth.status = res.status
  
  
         //se utente ha correttamente verificato il codice redirect dentro il sito e creo variabile utente loggato
        if(this.auth.status == statoAccesso.utenteLoggato)
        {
          this.auth.utente = {
            id:res.body.userId,
            username:res.body.username,
            idRuolo:res.body.idRuolo
          }
          // this.auth.utente = res.body
          console.log(this.auth.utente)

          this.router.navigate(["/homepage"])
        }else if(this.auth.status == statoAccesso.credenzialiValide)
          {
            this.auth.utenteId = res.body.userId
            this.auth.listaRuoliUtente = res.body.listaRuoli
            const dialogRef = this.dialog.open(SelezionaRuoloComponent)
          }

        //se errore redirect al login
        else{
          alert("errore inserimento codice verifica")
        }
          
  
        });
    }

}