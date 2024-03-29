import { Component } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.scss'
})
export class LoginBoxComponent {

  constructor(public auth : AuthenticationService){}

}
