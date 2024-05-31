// app.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from './service/authentication.service';
import { Observable, firstValueFrom } from 'rxjs';
import { LoadingService } from './service/loading.service';
import { MenuDinamicoService } from './service/menu-dinamico.service';
import { notLogged } from './guard/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AssociazioneMFAComponent } from './pages/login-box/associazione-mfa/associazione-mfa.component';
import { LoginBoxComponent } from './pages/login-box/login-box/login-box.component';
import { LoginComponent } from './pages/login-box/login/login.component';
import { ValidatoreMFAComponent } from './pages/login-box/validatore-mfa/validatore-mfa.component';
import { ModificaPasswordComponent } from './pages/modifica-password/modifica-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /* animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ] */
})



  

export class AppComponent /*implements CanActivate*/ {
  isDropdownOpen: boolean = false;
  selectedItem: string = '';

  constructor(private router: Router, private authService : AuthenticationService,public loadingSerive:LoadingService, public menuDinamicoService: MenuDinamicoService){ 
    // verToken 
    authService.ValidateTokenAsync()

    // this.router.resetConfig([
    //   {
    //     path: '',
    //     redirectTo: 'Account/login',
    //     pathMatch: "full",
    //   },
    //   {
    //     path: 'Home',
    //     pathMatch: "full",
    //     component: /*LoginComponent*/ HomepageComponent,
    //   },
    //   {
    //     path: 'Account',
    //     component: LoginBoxComponent,
    //     children: [
    //       { path: 'login', component: /*HomepageComponent*/ LoginComponent },
    //       { path: 'associazione-mfa', component: AssociazioneMFAComponent },
    //       { path: 'validatore-mfa', component: ValidatoreMFAComponent },
    //       { path: 'reset-password', component: ModificaPasswordComponent },
    //     ],
    //     canActivate: [notLogged]
    //   }]);
    
    // console.log(this.router);
    console.log(localStorage.getItem("menuRoute"));
    
    menuDinamicoService.loadRoute();       
    
    console.log('END constructor() from AppComponent');
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   console.log("canActivate");
  //   var esito = this.menuDinamicoService.loadRoute();
  //   return esito;
  // }
  

  toggleDropdown(){
    alert("ok")
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemClick(item: string) {
    this.selectedItem = item;
    this.isDropdownOpen = false;
    this.router.navigateByUrl(item);
  }
}


// export const verToken = async () => {
//   const authService = inject(AuthenticationService)
//   const response =  await firstValueFrom(authService.ValidateToken())
// }