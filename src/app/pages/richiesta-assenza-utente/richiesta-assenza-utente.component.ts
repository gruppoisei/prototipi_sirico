import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Richiesta } from '../../dto/request/assenze';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RichiestaAutorizzazioneService } from '../../service/richiesta-autorizzazione.service';

@Component({
  selector: 'app-richiesta-assenza-utente',
  templateUrl: './richiesta-assenza-utente.component.html',
  styleUrls: ['./richiesta-assenza-utente.component.scss'],
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
    AndpDocumentipersonas: '',
  };

  tipiRichiesta: any;
  richiestaAssenzeService: any;

  constructor(
    private http: HttpClient,
    private richiestaAutorizzazioneService: RichiestaAutorizzazioneService
  ) {}

  ngOnInit(): void {
    this.getAllTipoRichiesta();
  }

  submitForm() {
    this.http
      .post<any>('RichiestaAutorizzazione/RichiestaAssenza', this.formData)
      .subscribe({
        next: (res) => {
          console.log('Dati inviati con successo:', res);
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
            AndpDocumentipersonas: '',
            //
          };
        },
        error: (err) => {
          console.log("Errore durante l'invio dei dati:" + err);
        },
      });
  }

  getAllTipoRichiesta() {
    this.richiestaAssenzeService.getAllTipoRichiesta().subscribe(
      (response: any) => {
        this.tipiRichiesta = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di assenza:', error);
      }
    );
  }
}
