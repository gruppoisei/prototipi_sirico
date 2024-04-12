import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  
  isAuthenticated : boolean = false

  constructor(private auth:AuthenticationService){}
  
  Prova()
  {
    console.log(this.auth.utente)
  }

}
