import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Richiesta } from '../../dto/request/assenze';
import { Input } from '@angular/core';

@Component({
  selector: 'app-richiesta-assenza-utente',
  templateUrl: './richiesta-assenza-utente.component.html',
  styleUrls: ['./richiesta-assenza-utente.component.scss']
})
export class RichiestaAssenzaUtenteComponent {

  formData: Richiesta = {
  //  RiasFkPersonaid: null,
    RiasFkTiporichiesta: 0,
 //   RiasFkResponsabileidApprovazione: null,
 //   RiasApprovato: false,
    RiasDataorainizioassenza: '',
    RiasDataorafineassenza: '',
    RiasNote: '',
    RiasSysuser: '',
//    RiasSysdate: '',
//   RiasFlagattivo: false,
    AndpDocumentipersonas: ''
  };

  constructor(private http: HttpClient) { }

  submitForm() {
    this.http.post<any>('RichiestaAutorizzazione/RichiestaAssenza', this.formData)
      .subscribe(
        response => {
          console.log('Dati inviati con successo:', response);
          // Resetta i campi del modulo dopo l'invio
          this.formData = {
          //  RiasRichiestaassenzaid: null,
          //  RiasFkPersonaid: null,
            RiasFkTiporichiesta: 0,
          //  RiasFkResponsabileidApprovazione: null,
          //  RiasApprovato: false,
            RiasDataorainizioassenza: '',
            RiasDataorafineassenza: '',
            RiasNote: '',
            RiasSysuser: '',
          //  RiasSysdate: '',
          //  RiasFlagattivo: false,
            AndpDocumentipersonas: ''
          };
        },
        error => {
          console.error('Errore durante l\'invio dei dati:', error);
        }
      );
  }
}
