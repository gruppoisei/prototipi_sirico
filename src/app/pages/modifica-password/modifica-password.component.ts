import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.component.html',
  styleUrl: './modifica-password.component.scss'
})
export class ModificaPasswordComponent {


submitChangePasssword() {

}

  cambioPasswordForm !: FormGroup;

  constructor(private fb : FormBuilder)
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
