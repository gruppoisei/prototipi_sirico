import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/authentication.service';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
 
  resetPasswordControl !: FormGroup

  constructor(private reset : AuthenticationService, private fb: FormBuilder, private dialog : MatDialog)
  {

  }
  ngOnInit(): void {
    this.resetPasswordControl = this.fb.group(
      {
        username : ['', Validators.required]
      })
  }


  getEmailByUsername()
  {

  }

  requestPasswordEmail()
  {
    this.resetPassword()
  }

resetPassword()
{
  if(this.resetPasswordControl.valid)
  {
    debugger
    const username = this.resetPasswordControl.get('username')?.value
    this.reset.resetPasswordReset(username)
    .subscribe(
      {
        next:(res)=>
        {
          
        },
        error:(err)=>
        {
          console.log(err)
        }
      })
  }
  else
  {
    ValidateForm.validateAllFormFields(this.resetPasswordControl);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto',
        });
  }
}


}
