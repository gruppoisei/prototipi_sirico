import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  constructor(private auth:AuthenticationService, private router : Router){}

  logout() {
    this.auth.logout().subscribe({

      next : () =>{
          this.router.navigate([''])
        },

      error : (err) =>{

        }
    })
    }

  // Prova()
  // {
  //   console.log(this.auth.utente)
  // }

}
