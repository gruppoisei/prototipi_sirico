import { Component } from '@angular/core';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleziona-ruolo-dialog',
  templateUrl: './seleziona-ruolo-dialog.component.html',
  styleUrl: './seleziona-ruolo-dialog.component.scss'
})
export class SelezionaRuoloDialogComponent {

  ruoloId = 0
  constructor(public auth: AuthenticationService,private router:Router){}

  ConfermaRuolo()
  {
    if(this.ruoloId == 0) alert("Seleziona Ruolo")
      else{
        this.auth.ConfermaRuolo(this.ruoloId).subscribe(
          (res:any) =>
            {
              this.auth.status = res.status
              if(this.auth.status == statoAccesso.utenteLoggato)
                {
                  this.auth.utente = {
                    id:res.body.userId,
                    username:res.body.username,
                    idRuolo:res.body.idRuolo
                  }
                  this.router.navigate(["/Home"]);
                }
              }
        )
      }
  }

}
