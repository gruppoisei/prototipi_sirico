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

  constructor(private _service: InsertContrattoService, private router: Router, private location: Location) {}
  ngOnInit(): void {
    //this.clearForm();
  }

  clearForm(): void {
    this.clienteSocieta = {
      ragioneSociale: null,
      partitaIVA: null,
      sedeLegale: null,
      sedeOperativa: null,
      sedeDiLavoro: null,
      patInail: null,
      nominativoLegaleRappresentante: null,
      codiceAteco: null,
      numeroTelefono: null,
      indirizzoPec: null,
      nomeRefAmmin: null,
      pecRefAmmin: null,
      numeroRefAmmin: null,
    };
  }

  onSaveData(clienteSocieta: any): void {
    console.log(clienteSocieta);
    this._service.saveClienteData(clienteSocieta).subscribe(
      (response) => {
        console.log('Dati inviati con successo al backend:', response);
        //
      },
      (error) => {
        console.error("Errore nell'invio dei dati al backend:", error);
        //
      }
    );
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
      /*
      this.isPhoneNumberError &&
      this.clienteSocieta.numeroTelefono !== null &&
      this.clienteSocieta.numeroTelefono !== '' &&
      !phoneNumberPattern.test(this.clienteSocieta.numeroTelefono)
      */
      telefono !== null && 
      !phoneNumberPattern.test(this.clienteSocieta.numeroTelefono)
      );
  }

  closeInsertCliente(){
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
