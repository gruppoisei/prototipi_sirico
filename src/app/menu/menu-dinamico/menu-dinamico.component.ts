import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AmministrazioneRuoloService } from '../../service/amministrazione-ruolo.service';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service';
import { MenuDinamicoService } from '../../service/menu-dinamico.service';
import { LoginComponent } from '../../pages/login-box/login/login.component';
import { AppRoutingModule } from '../../app-routing.module';

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
    public menuDinamicoService: MenuDinamicoService,
    private appRoutingModule: AppRoutingModule

  ) { }

  ngOnInit(): void {

  }


  logout() {
    console.log('logout')
    this.auth.logout().subscribe({

      next: () => {
        const zero = 0;
        sessionStorage.setItem("idRuoloRoute", zero.toString());
        this.menuDinamicoService.loadRoute();
        // this.router.resetConfig([{ path: 'Account/login', component: LoginComponent}]);
        // this.router.navigate(['/Account/login'])
      },

      error: (err) => {

      }
    })
  }



}