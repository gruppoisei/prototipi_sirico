import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../service/authentication.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
 
  resetPasswordControl !: FormGroup

  constructor(private reset : AuthenticationService, private fb: FormBuilder,)
  {

  }
  ngOnInit(): void {
    this.resetPasswordControl = this.fb.group(
      {
        username : ['', Validators.required]
      })
  }


requestNewPassword()
{
  if(this.resetPasswordControl.valid)
  {
    this.reset.resetPasswordReset(this.resetPasswordControl.get('username')?.value)
  }
}


}
