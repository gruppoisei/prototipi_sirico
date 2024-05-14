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


export function passwordStrengthValidator(): ValidatorFn {
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

export function onlyNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const onlyNumeric = /^\d+$/.test(value);
    
    return !onlyNumeric ? { onlyNumber: true } : null;
  };
}

export function minNumberValidator(min:number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if(!Number.isNaN(value)){
      if(Number(value) <= min) return { minNumber: min }
    }
     return null

  };
}


export function maxNumberValidator(max:number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if(!Number.isNaN(value)){
      if(Number(value) >= max) return { maxNumber: max }
    }
     return null

  };
}