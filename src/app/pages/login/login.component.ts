import { Component } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
    user: string = '';
    pass: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  doLogin() {
    this.authenticationService.login(this.user, this.pass)
    .subscribe(
      response => {
        // console.log(response);
        console.log("autenticazione riuscita!");
        //impostare token
        this.router.navigate(['/homepage']);
      },
      error => {
        console.log(error);
        // console.log("nome utente o password non corretti.");
      }
    );
  }


}
