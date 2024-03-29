import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { NewPasswordResponseDialogComponent } from '../../ui/new-password-response-dialog/new-password-response-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.component.html',
  styleUrl: './modifica-password.component.scss'
})
export class ModificaPasswordComponent {

  cambioPasswordForm !: FormGroup;

  constructor(private fb : FormBuilder, private auth: AuthenticationService, private dialog : MatDialog)
  {
    this.cambioPasswordForm = this.fb.group({
      username: ['', Validators.required],
      nuovaPassword: ['', Validators.required],
      confermaPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator
    })
  }

  
  submitChangePasssword() {

    if(this.cambioPasswordForm.valid)
    {
      const newPasswordObj = 
      {
        username : this.cambioPasswordForm.get('username')?.value,
        password : this.cambioPasswordForm.get('confermaPassword')?.value
      }
      this.auth.newPassword(newPasswordObj).subscribe(
        {
          next:(res) =>
          {
            debugger
            this.dialog.open(NewPasswordResponseDialogComponent,
              {
                data : {successMessage : res.message},
                width: 'auto',
                height: 'auto'           
              });
            this.auth.status = 0
          },
          error:(err) =>
          this.dialog.open(NewPasswordResponseDialogComponent,
            {
              data : {errroMessage : err?.error.message},
              width: 'auto',
              height: 'auto'
            })
        })
    }
  
  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('nuovaPassword')?.value ===
    control.get('confermaPassword')?.value ? null : {mismatch : true}
  }

  isFieldValid(field: string) {
    return (
      this.cambioPasswordForm.get(field)?.touched &&
      !this.cambioPasswordForm.get(field)?.valid
    );
  }
  

}
