// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthenticationService } from './service/authentication.service';

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

export class AppComponent {
  isDropdownOpen: boolean = false;
  selectedItem: string = '';

  constructor(private router: Router, private authService : AuthenticationService){  }

  toggleDropdown(){
    alert("ok")
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onItemClick(item: string) {
    this.selectedItem = item;
    this.isDropdownOpen = false;
    this.router.navigateByUrl(item);
  }

  ControlloToken()
  {

    this.authService.ValidateToken().subscribe(
      {
        next : (res) => 
          {
            this.authService.utente = res.body.utenteLoggato
          },
        error: () =>
          {
            this.authService.utente = undefined;
            //this.router.navigate(["login/login"])
          }
      })
  }
}
