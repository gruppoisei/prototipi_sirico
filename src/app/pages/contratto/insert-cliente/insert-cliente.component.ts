import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { clienteSocieta } from '../../../dto/response/nuovoCliente';
import { ClienteService } from '../../../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-cliente',
  templateUrl: './insert-cliente.component.html',
  styleUrls: ['./insert-cliente.component.scss'],
})
export class InsertClienteComponent {



  listaIdValore = [
    { id: 0, nome: "zero", qualcosa: "orez" },
    { id: 1, nome: "uno", qualcosa: "onu" },
    { id: 2, nome: "due", qualcosa: "eud" },
    { id: 3, nome: "tre", qualcosa: "ert" },
  ];

  public provaForm = this.fg.group(
    {
      elementoSelect: new FormControl(null, [Validators.required])
    }
  )

  nuovoCliente: clienteSocieta | null = null;

  public myForm: FormGroup = this.fg.group(
    {
      idcliente: new FormControl(null, []),
      ragionesociale: new FormControl(null, [Validators.required]),
      partitaiva: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
      sedelegale: new FormControl(null, []),
      sedeoperativa: new FormControl(null, []),
      patinail: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      rappresentantelegale: new FormControl(null, []),
      sedelavoro: new FormControl(null, []),
      codiceateco: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      numerotelefono: new FormControl(null, []),
      indirizzopec: new FormControl(null, [Validators.email]),
      refamministratore: new FormControl(null, []),
      emailrefammin: new FormControl(null, [Validators.email]),
      telefonorefammin: new FormControl(null, []),

      // sysdate: new FormControl(null, []),
      // sysuser: new FormControl(null, []),
      // flagAttiva: new FormControl(null, [])

    });



  constructor(
    private fg: FormBuilder,
    private location: Location,
    private clienteService: ClienteService,
    private router: Router
  ) {


    this.clienteService.idCliente$.value !== undefined ? this.getClienteById() : null;
  }

  ngOnDestroy(): void {
    this.clienteService.idCliente$.next(undefined);
    this.myForm.reset();
  }


  getClienteById() {
    this.clienteService.getClienteById().subscribe(
      (response: any) => {
        this.nuovoCliente = response;
        console.log("this.nuovoCliente:");
        console.log(this.nuovoCliente);

        if (this.nuovoCliente != null) {
          this.myForm.setValue(this.nuovoCliente);
        }

      },
      (error: any) => {
        console.error(
          'Errore durante il caricament delle aziende clienti per il distacco.'
        );
      }
    );
  }


  Reset() {

    if (confirm("I campi verranno reimpostati al valore iniziale. Si desidera procedere?")) {

      this.myForm.markAsUntouched();

      if (this.nuovoCliente != null) {
        this.myForm.setValue(this.nuovoCliente);
      } else {
        this.myForm.reset();
        this.clienteService.idCliente$.next(undefined);
      }
    }
  }

  onSubmit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();      
    } else {      
      this.nuovoCliente = this.myForm.getRawValue();
      //console.log(this.nuovoCliente);
      this.clienteService.saveClienteData(this.nuovoCliente!).subscribe(
        (response) => {
          console.log('Dati inviati con successo al backend:')
          console.log(response);
          
          this.clienteService.idCliente$.next(undefined);
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
    if (confirm("La pagina verrà chiusa e i dati modificati andranno persi. Si desidera procedere?")) {
      //this.location.back();
      this.router.navigate(['/Segreteria/gestione-cliente']);
    }
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
