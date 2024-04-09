import { Component, OnInit } from '@angular/core';
import { AuthenticationService, statoAccesso } from '../../../service/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { ModificaPasswordComponent } from '../../modifica-password/modifica-password.component';
import { SelezionaRuoloComponent } from '../seleziona-ruolo/seleziona-ruolo.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{


  loginForm !: FormGroup
  isAuthenticated : boolean = false
  constructor(public dialog: MatDialog, private auth: AuthenticationService, private router: Router, private fb : FormBuilder) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })
     }


  // doLogin() {
  //   if(this.loginForm.valid)
  //   {
  //     this.auth.login(this.loginForm.value)
  //     .subscribe({
  //       next:(res) =>
  //       {
  //         this.auth.status = res.status;
  //         if(this.auth.status == statoAccesso.accessoNegato)
  //         {
  //           console.log(res.body.message)
  //         }
  //         if(this.auth.status == statoAccesso.mancaMFA)
  //         {
  //           console.log(res.body)
  //           // this.auth.utenteId = res.body
  //           this.auth.imageQRCode = res.body.imageQRCode
  //           this.auth.utenteId = res.body.utenteId
  //         }
          
  //         if(this.auth.status == statoAccesso.scadutoMFA)
  //         {
  //           console.log(res.body)
  //           this.auth.utenteId = res.body

  //         }
  //         if(this.auth.status == statoAccesso.utenteLoggato)
  //         {
  //           this.auth.utente = res.body;
  //           this.router.navigate(["/homepage"]);
  //         }
  //       },
  //       error:(err)=>
  //       {
  //         this.dialog.open(ErrorLoginDialogComponent,
  //           {
  //             data: {errorMessage : err?.error.message},
  //             width: 'auto',
  //             height: 'auto'
  //           })
  //       }
  //     })
  //   }
  //   else
  //   { 
  //     ValidateForm.validateAllFormFields(this.loginForm);
  //     this.dialog.open(ResponseDialogComponent,
  //       {
  //         width: 'auto',
  //         height: 'auto',
  //       });
  //   }
  // }

  
  doLogin() {
    if(this.loginForm.valid)
    {
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>
        {
          this.auth.status = res.status;
          if(this.auth.status == statoAccesso.accessoNegato)
          {
          
            console.log(res.body.message)
          }
          if(this.auth.status == statoAccesso.mancaMFA)
          {
            console.log(res.body)
            this.router.navigate(["login/associazione-mfa"])
            // this.auth.utenteId = res.body
            this.auth.imageQRCode = res.body.imageQRCode
            this.auth.utenteId = res.body.utenteId
          }
          
          if(this.auth.status == statoAccesso.scadutoMFA)
          {
            this.router.navigate(["login/validatore-mfa"])

            console.log(res.body)
            this.auth.utenteId = res.body

          }
          if(this.auth.status == statoAccesso.utenteLoggato)
          {
            this.auth.utente = res.body;
            this.router.navigate(["/homepage"]);
          }
          if(this.auth.status == statoAccesso.credenzialiValide)
            {
              this.auth.utenteId = res.body.userId
              this.auth.listaRuoliUtente = res.body.listaRuoli
              const dialogRef = this.dialog.open(SelezionaRuoloComponent)
            }
        },
        error:(err)=>
        {
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error.message},
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
