import { Component, OnInit } from '@angular/core';
import {
  AuthenticationService,
  statoAccesso,
} from '../../../service/authentication.service';
import { Router } from '@angular/router';
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
    private router: Router,
    private fb: FormBuilder,
    
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



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
              this.auth.utenteId = res.body;
              break;
            // accesso con unico ruolo
            case statoAccesso.utenteLoggato:
              this.auth.utente = res.body
              console.log("this.auth.utente : ", this.auth.utente);
              sessionStorage.setItem('SysUser', res.body.utenteLoggato.username)
              this.router.navigate(['/Home']);
              break;
            // accesso per più ruoli
            case statoAccesso.credenzialiValide:
              this.auth.utenteId = res.body.userId;
              this.auth.listaRuoliUtente = res.body.listaRuoli;
              this.dialog.open(SelezionaRuoloDialogComponent, {
                width: 'auto',
                height: 'auto',
              }).afterClosed().subscribe(() => {
                this.router.navigate(['/Home'])
              });
              sessionStorage.setItem('SysUser', res.body.username)
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
