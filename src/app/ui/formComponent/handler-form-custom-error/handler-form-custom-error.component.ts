import { Component, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-handler-form-custom-error',
  templateUrl: './handler-form-custom-error.component.html',
  styleUrl: './handler-form-custom-error.component.scss'
})
export class HandlerFormCustomErrorComponent {

  @Input()
  errore: any;


  @Input()
  touched: boolean = false;

}


export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}

export function createNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // const onlyNumeric = /^[0-9]*$/.test(value);
    const onlyNumeric = /^\d+$/.test(value);

    
    return !onlyNumeric ? { onlyNumber: true } : null;
  };
}
