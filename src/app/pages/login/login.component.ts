import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  loginForm !: FormGroup

  constructor(private auth: AuthenticationService, private router: Router, private fb : FormBuilder) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })

     }


  doLogin() {
    this.auth.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
    .subscribe({
      next:(res) => {
        console.log(res.message);
        this.router.navigate(['/homepage']);
      },
      error : (err) =>
      {
        console.log(err.error.message);
      }
    })
  }
}
