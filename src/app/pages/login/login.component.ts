import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password-dialog/forgot-password/forgot-password.component';
import ValidateForm from '../../helpers/validateform';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';
import { ErrorLoginDialogComponent } from '../../ui/error-login-dialog/error-login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{


  loginForm !: FormGroup

  constructor(public dialog: MatDialog, private auth: AuthenticationService, private router: Router, private fb : FormBuilder) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })

     }


  doLogin() {
    if(this.loginForm.valid)
    {
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>
        {
          const flagPassword = res;
          if(flagPassword == 1)
          {
            this.dialog.open(ForgotPasswordComponent)
          }
          else
          {
            this.router.navigate(["/homepage"])
          }

        },
        error:(err)=>
        {debugger
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error},
              width: 'auto',
              height: 'auto'
            })
        }
      })
    }
    else
    { 
      ValidateForm.validateAllFormFields(this.loginForm);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto',
        });
    }
  }

  openForgotPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordComponent);
    }
}
