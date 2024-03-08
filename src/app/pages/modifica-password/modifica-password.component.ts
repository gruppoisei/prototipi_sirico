import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.component.html',
  styleUrl: './modifica-password.component.scss'
})
export class ModificaPasswordComponent {
submitChangePasssword() {
throw new Error('Method not implemented.');
}

  cambioPasswordForm !: FormGroup;

  constructor(private fb : FormBuilder)
  {
    this.cambioPasswordForm = this.fb.group({
      username: ['', Validators.required],
      nuovaPassword: ['', Validators.required],
      confermaPassword: ['', Validators.required],
    },{validator: this.passwordMatchValidator})
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const nuovaPassword = formGroup.get('nuovaPassword')?.value;
    const confermaPassword = formGroup.get('confermaPassword')?.value;
    return nuovaPassword === confermaPassword ? null : { passwordMismatch: true };
  }

  isFieldValid(field: string) {
    return (
      this.cambioPasswordForm.get(field)?.touched &&
      !this.cambioPasswordForm.get(field)?.valid
    );
  }

}
