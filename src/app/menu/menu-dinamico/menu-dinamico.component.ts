import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AmministrazioneRuoloService } from '../../service/amministrazione-ruolo.service';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';
import { MenuDinamicoService } from '../../service/menu-dinamico.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-menu-dinamico',
  templateUrl: './menu-dinamico.component.html',
  styleUrl: './menu-dinamico.component.scss',

})

export class MenuDinamicoComponent implements OnInit {
  
  constructor(
    private amministrazioneRuolo: AmministrazioneRuoloService,
    private router: Router,
    private auth: AuthenticationService,
    public menuDinamico: MenuDinamicoService

  ) {}

  ngOnInit(): void {
  
  }

  
  logout() {
    console.log('logout')
    this.auth.logout().subscribe({

      next : () =>{
          this.router.navigate([''])
        },

      error : (err) =>{

        }
    })
  }

  

}