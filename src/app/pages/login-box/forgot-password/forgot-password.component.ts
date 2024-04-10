import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/authentication.service';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { ResponseResetPasswordDialogComponent } from '../../../ui/response-reset-password-dialog/response-reset-password-dialog.component';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
 
  resetPasswordControl!:FormGroup

  constructor(private reset : AuthenticationService, private fb: FormBuilder, private dialog : MatDialog) { }
  ngOnInit(): void {
    this.resetPasswordControl = this.fb.group(
      {
        username : ['', Validators.required]
      })
  }

  requestResetPassword()
{
  if(this.resetPasswordControl.valid)
  {
    const username = this.resetPasswordControl.get('username')?.value
    this.reset.resetPasswordReset(username)
    .subscribe(
      {
        next:(res)=>
        {
          this.dialog.open(ResponseResetPasswordDialogComponent,
            {
              data : {email : res.message},
              width : 'auto',
              height : 'auto'
            })
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
    ValidateForm.validateAllFormFields(this.resetPasswordControl);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto'
        });
  }
}


}
