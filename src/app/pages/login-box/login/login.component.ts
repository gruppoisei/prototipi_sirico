import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  statoAccesso,
} from '../../../service/authentication.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { SelezionaRuoloDialogComponent } from '../seleziona-ruolo-dialog/seleziona-ruolo-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isAuthenticated: boolean = false;
  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
  //           this.dialog.open(ErrorLoginDialogComponent,
  //             {
  //               data: {errorMessage : res?.body.message},
  //               width: 'auto',
  //               height: 'auto'
  //             })
  //         }
  //         if(this.auth.status == statoAccesso.richiestaResetPsw)
  //         {
  //           this.router.navigate(["Account/reset-password"])

  //         }
  //         if(this.auth.status == statoAccesso.mancaMFA)
  //         {
  //           this.router.navigate(["Account/associazione-mfa"])
  //           this.auth.imageQRCode = res.body.imageQRCode
  //           this.auth.utenteId = res.body.utenteId
  //         }

  //         if(this.auth.status == statoAccesso.scadutoMFA)
  //         {
  //           this.router.navigate(["Account/validatore-mfa"])

  //           console.log(res.body)
  //           this.auth.utenteId = res.body

  //         }
  //         if(this.auth.status == statoAccesso.utenteLoggato)
  //         {
  //           this.auth.utente = {
  //             id:res.body.userId,
  //             username:res.body.username,
  //             idRuolo:res.body.idRuolo
  //           }

  //           this.router.navigate(["homepage"]);
  //         }
  //         if(this.auth.status == statoAccesso.credenzialiValide)
  //           {
  //             this.auth.utenteId = res.body.userId
  //             this.auth.listaRuoliUtente = res.body.listaRuoli
  //             this.dialog.open(SelezionaRuoloDialogComponent,
  //               {
  //                 width : 'auto',
  //                 height : 'auto'
  //               }
  //             )
  //           }
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
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.auth.status = res.status;

          switch (this.auth.status) {
            case statoAccesso.accessoNegato:
              this.dialog.open(ErrorLoginDialogComponent, {
                data: { errorMessage: res?.body.message },
                width: 'auto',
                height: 'auto',
              });
              break;
            case statoAccesso.richiestaResetPsw:
              this.router.navigate(['Account/reset-password']);
              break;
            case statoAccesso.mancaMFA:
              this.router.navigate(['Account/associazione-mfa']);
              this.auth.imageQRCode = res.body.imageQRCode;
              this.auth.utenteId = res.body.utenteId;
              break;
            case statoAccesso.scadutoMFA:
              this.router.navigate(['Account/validatore-mfa']);

              console.log(res.body);
              this.auth.utenteId = res.body;
              break;
            case statoAccesso.utenteLoggato:
              this.auth.utente = res.body
              // this.auth.utente = {
              //   id: res.body.userId,
              //   username: res.body.username,
              //   idRuolo: res.body.idRuolo,
              // };
              this.router.navigate(['']);
              break;
            case statoAccesso.credenzialiValide:
              this.auth.utenteId = res.body.userId;
              this.auth.listaRuoliUtente = res.body.listaRuoli;
              this.dialog.open(SelezionaRuoloDialogComponent, {
                width: 'auto',
                height: 'auto',
              });
              break;
          }
        },
        error: (err) => {
          this.dialog.open(ErrorLoginDialogComponent, {
            data: { errorMessage: err?.error.message },
            width: 'auto',
            height: 'auto',
          });
        },
      });
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      this.dialog.open(ResponseDialogComponent, {
        width: 'auto',
        height: 'auto',
      });
    }
  }

  openForgotPassword() {
    this.dialog.open(ForgotPasswordComponent);
  }
}
