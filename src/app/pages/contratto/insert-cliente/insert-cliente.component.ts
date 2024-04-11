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
    /*se ( ragione sociale non vuota, partita iva non vuota e valida, pat inali non vuoto e valido, e
      e (email valida o null) e (numero telefono valido o null) e (codice ateco valido o null)) ritorna vero */

    if ((this.clienteSocieta.Ragionesociale != null) &&
      (this.clienteSocieta.Partitaiva != null && this.validatePartitaIVA(this.clienteSocieta.partitaIVA)) &&
      (this.clienteSocieta.Patinail != null && this.validatePATINAIL(this.clienteSocieta.Patinail)) &&
      (this.clienteSocieta.email == null || this.validateEmail(this.clienteSocieta.email)) &&
      (this.clienteSocieta.Indirizzopec == null || this.validateEmail(this.clienteSocieta.Indirizzopec)) &&
      (this.clienteSocieta.Numerotelefono == null || this.validatePhoneNumber(this.clienteSocieta.Numerotelefono)) &&
      (this.clienteSocieta.Telefonorefammin == null || this.validatePhoneNumber(this.clienteSocieta.Telefonorefammin)) &&
      (this.clienteSocieta.Codiceateco == null || this.validateATECO(this.clienteSocieta.Codiceateco))     ) {
      return true;
    } else {
      return false;
    }
  }

  validatePhoneNumber(phoneNumber: string) {
    phoneNumber = phoneNumber.replace(/\s/g, '');
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phoneNumber);
  }

  validateEmail(email: string) {
    email = email.replace(/\s/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateATECO(atecoCode: string) {    //CONSIDERANDO CHE UN CODICE ATECO SIA 2 CIFRE, 2CIFRE.2?CIFRE O 2CIFRE.2?CIFRE.2?CIFRE
    atecoCode = atecoCode.replace(/\s/g, '');
    const atecoRegex = /^\d{2}(\.\d{1,2})?(\.\d{1,2})?$/;
    return atecoRegex.test(atecoCode);
  }

  validatePATINAIL(patInailCode: string) {     //CONSIDERANDO CHE UN PAT INAIL SIA 10 CARATTERI: 3 LETTERE + 7 NUMERI
    patInailCode = patInailCode.replace(/\s/g, '');
    const patInailRegex = /^[A-Za-z]{3}\d{7}$/;
    return patInailRegex.test(patInailCode);
  }

  validatePartitaIVA(partitaIVA: string) {
    partitaIVA = partitaIVA.replace(/\s/g, '').replace(/-/g, '');
    if (partitaIVA.length !== 11 || !/^\d+$/.test(partitaIVA)) return false;

    //controllo logica partita iva
    const ultimaCifra = parseInt(partitaIVA[10]);
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      let digit = parseInt(partitaIVA[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    const cifraControlloCalcolata = (10 - (sum % 10)) % 10;

    return (ultimaCifra === cifraControlloCalcolata);
  }

  closeInsertCliente() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?')) {
      this.location.back();
    }
  }
}
