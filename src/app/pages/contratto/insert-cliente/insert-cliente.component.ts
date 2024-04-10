import { Component, OnInit } from '@angular/core';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { clienteSocieta } from '../../../dto/response/nuovoCliente';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-insert-cliente',
  templateUrl: './insert-cliente.component.html',
  styleUrls: ['./insert-cliente.component.scss'],
})
export class InsertClienteComponent implements OnInit {

  clienteSocieta: any;
  isPhoneNumberError: boolean = false;

  constructor(private _service: InsertContrattoService, private router: Router, private location: Location) {
    this.clienteSocieta = {
      Ragionesociale: null,
      Partitaiva: null,
      Sedelegale: null,
      Sedeoperativa: null,
      Patinail: null,
      Rappresentantelegale: null,
      Sedelavoro: null,
      Codiceateco: null,
      Numerotelefono: null,
      Indirizzopec: null,
      Refamministratore: null,
      Emailrefammin: null,
      Telefonorefammin: null,
      Sysuser: "frontend",
      FlagAttiva: true,
    };
  }

  ngOnInit(): void {
    //this.clearForm();
  }

  clearForm(): void {
    this.clienteSocieta = {
      Ragionesociale: null,
      Partitaiva: null,
      Sedelegale: null,
      Sedeoperativa: null,
      Patinail: null,
      Rappresentantelegale: null,
      Sedelavoro: null,
      Codiceateco: null,
      Numerotelefono: null,
      Indirizzopec: null,
      Refamministratore: null,
      Emailrefammin: null,
      Telefonorefammin: null,
      Sysuser: "frontend",
      FlagAttiva: true,
    };
  }

  submitForm() {
    if (this.isFormValid()) {
      //console.log(JSON.stringify(this.clienteSocieta));
      this._service.saveClienteData(this.clienteSocieta).subscribe(
        (response) => {
          console.log('Dati inviati con successo al backend:', response);
          //
        },
        (error) => {
          console.error("Errore nell'invio dei dati al backend:", error);
          //
        }
      );
    } else {
      console.log("La form non è valida.");
    }
  }

  isFormValid(): boolean {
    /*    for (const i in this.clienteSocieta) {
        if (
          this.clienteSocieta.hasOwnProperty(i) &&
          (this.clienteSocieta[i] === null || this.clienteSocieta[i] === '')
        ) {
          return false;
        }
      }*/
    return true;
  }

  isPhoneNumberInvalid(telefono: number): boolean {
    const phoneNumberPattern = /^\d{10}$/; //dovrebe accettare solo 10 cifre

    return (
      telefono !== null &&
      !phoneNumberPattern.test(this.clienteSocieta.numeroTelefono)
    );
  }

  closeInsertCliente() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?')) {
      //this.router.navigate(['/homepage']);
      this.location.back();
    }
  }

  validaEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
