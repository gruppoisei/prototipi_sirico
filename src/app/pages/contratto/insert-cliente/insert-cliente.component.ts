import { Component, OnInit } from '@angular/core';
import { InsertContrattoService } from '../../../service/insert-contratto.service';
import { clienteSocieta } from '../../../dto/response/nuovoCliente';

@Component({
  selector: 'app-insert-cliente',
  templateUrl: './insert-cliente.component.html',
  styleUrls: ['./insert-cliente.component.scss']
})
export class InsertClienteComponent implements OnInit {
  clienteSocieta: any;
  isPhoneNumberError: boolean = false;

  constructor(private _service: InsertContrattoService) { }
  ngOnInit(): void {
    this.clearForm();
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
      numeroTelefono: null,   // questo è un numero
      indirizzoPec: null,
      nomeRefAmmin: null,
      pecRefAmmin: null,
      numeroRefAmmin: null,   // questo è un numero
    }
  }

  onSaveData(clienteSocieta: any): void {
    console.log(clienteSocieta);
    this._service.saveClienteData(clienteSocieta).subscribe(
      response => {
        console.log('Dati inviati con successo al backend:', response);
        //
      },
      error => {
        console.error('Errore nell\'invio dei dati al backend:', error);
        //
      }
    );
  }

  isFormValid(): boolean {
    for (const key in this.clienteSocieta) {
      if (this.clienteSocieta.hasOwnProperty(key) && (this.clienteSocieta[key] === null || this.clienteSocieta[key] === '')) {
        return false;
      }
    }
    return true;
  }

  isPhoneNumberInvalid(): boolean {
    return this.isPhoneNumberError && (this.clienteSocieta.numeroTelefono !== null && this.clienteSocieta.numeroTelefono !== '');
  }
  
}