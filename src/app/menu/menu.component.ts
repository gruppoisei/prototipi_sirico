import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  
  isAuthenticated : boolean = false

  constructor(private authService : AuthenticationService){}
  
  ngOnInit(): void {
    this.authService.getIsAuthenticated().subscribe((isAuthenticated : boolean) => 
    {
      this.isAuthenticated = isAuthenticated
    });
  }

}
