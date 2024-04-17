import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss'
})
export class LoginBoxComponent {

  constructor(public auth : AuthenticationService,private router:Router)
  {
    //verica credenziali o redirect
/*     if(auth.utente != undefined)
      {
        if(auth.utente.idRuolo != livelli.ospite)
          {
              router.navigate([""]);
          }
      } */
  }

}
