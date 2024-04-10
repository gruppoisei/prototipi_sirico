import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { AuthGuardService, livelli } from '../../../service/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss'
})
export class LoginBoxComponent {

  constructor(public auth : AuthenticationService,private guardia:AuthGuardService,private router:Router)
  {
    //verica credenziali o redirect
    if(guardia.utenteRuolo != livelli.ospite)
      {
          router.navigate(["homepage"]);
      }

  }

}
