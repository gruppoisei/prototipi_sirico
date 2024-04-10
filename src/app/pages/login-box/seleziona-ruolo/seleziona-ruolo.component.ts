import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RapportinoService } from '../../../service/rapportino.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleziona-ruolo',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './seleziona-ruolo.component.html',
  styleUrl: './seleziona-ruolo.component.scss'
})
export class SelezionaRuoloComponent {

  ruoloId = 0


  constructor(
    public dialogRef: MatDialogRef<SelezionaRuoloComponent>,
    // @Inject(MAT_DIALOG_DATA)
    public auth: AuthenticationService,private router:Router
  ) 
  {

  }

  ConfermaRuolo()
  {
    if(this.ruoloId == 0) alert("Seleziona Ruolo")
      else{
        this.auth.ConfermaRuolo(this.ruoloId).subscribe(
          (res:any) =>
            {
              console.log(res)
              this.auth.status = res.status
              if(this.auth.status == statoAccesso.utenteLoggato)
                {
                  this.auth.utente = {
                    id:res.body.userId,
                    username:res.body.username,
                    idRuolo:res.body.idRuolo
                  }
                  this.auth.storeIdRuolo(this.auth.utente.idRuolo.toString())
                  this.router.navigate(["homepage"]);
                  this.dialogRef.close()
                }
              }
        )
      }
  }
}
