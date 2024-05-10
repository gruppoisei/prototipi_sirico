import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { clienteSocieta } from '../../../dto/response/nuovoCliente';
import { ClienteService } from '../../../service/cliente.service';

@Component({
  selector: 'app-insert-cliente',
  templateUrl: './insert-cliente.component.html',
  styleUrls: ['./insert-cliente.component.scss'],
})
export class InsertClienteComponent {

  nuovoCliente: clienteSocieta | null = null;

  public myForm: FormGroup = this.fg.group(
    {
      Ragionesociale: new FormControl(null, [Validators.required]),
      Partitaiva: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      Sedelegale: new FormControl(null, []),
      Sedeoperativa: new FormControl(null, []),
      Patinail: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      Rappresentantelegale: new FormControl(null, []),
      Sedelavoro: new FormControl(null, []),
      Codiceateco: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      Numerotelefono: new FormControl(null, []),
      Indirizzopec: new FormControl(null, []),
      Refamministratore: new FormControl(null, []),
      Emailrefammin: new FormControl(null, [Validators.email]),
      Telefonorefammin: new FormControl(null, []),
    });

  constructor(
    private fg: FormBuilder,
    private location: Location,
    private clienteService: ClienteService
  ) {
    if (this.nuovoCliente != null) {
      this.myForm.setValue(this.nuovoCliente);
    }
  }


  Reset() {
    this.myForm.markAsUntouched();

    if (this.nuovoCliente != null) {
      this.myForm.setValue(this.nuovoCliente);
    } else {
      this.myForm.reset();
    }
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      //alert('no');
    } else {
      //alert('ok');
      this.nuovoCliente = this.myForm.getRawValue();
      //console.log(this.nuovoCliente);
      this.clienteService.saveClienteData(this.nuovoCliente!).subscribe(
        (response) => {
          console.log('Dati inviati con successo al backend:')
          console.log(response);
          this.myForm.reset();
          this.myForm.markAsUntouched();
        },
        (error) => {
          console.error("Errore nell'invio dei dati al backend:", error);

        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

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
