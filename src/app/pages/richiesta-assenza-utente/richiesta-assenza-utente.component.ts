import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Richiesta } from '../../dto/request/assenze';
import { Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RichiestaAutorizzazioneService } from '../../service/richiesta-autorizzazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-richiesta-assenza-utente',
  templateUrl: './richiesta-assenza-utente.component.html',
  styleUrls: ['./richiesta-assenza-utente.component.scss'],
})
export class RichiestaAssenzaUtenteComponent {
  idRichiesta: any;
  ore: string[] = [];
  richiesta: Richiesta[] = [];
  tipiRichiesta: [{ ritrTiporichiestaassenzaid: number; ritrDescrizioneassenza: string }] | undefined;
  formData: Richiesta = {
    //  RiasFkPersonaid: null,
    RiasFkTiporichiesta: 1,
    //  RiasFkResponsabileidApprovazione: null,
    //  RiasApprovato: false,
    // RiasDataorainizioassenza: '',
    // RiasDataorafineassenza: '',
    OraFine: null,
    OraInizio: null,
    DataFine: '',
    DataInizio: '',
    RiasNote: '',
    RiasSysuser: 'Edo',
    //  RiasSysdate: '',
    //  RiasFlagattivo: false,
      //AndpDocumentipersonas: '',
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private richiestaAutorizzazioneService: RichiestaAutorizzazioneService
  ) {
    this.generaOre();
  }

  ngOnInit(): void {
    this.getAllTipoRichiesta();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  }
  
  generaOre() {
    // Genera un array di ore con intervallo di 30 minuti
    for (let i = 0; i < 24; i++) {
      this.ore.push(`${('0' + i).slice(-2)}:00`);
      this.ore.push(`${('0' + i).slice(-2)}:30`);
    }
  }

  submitForm() {
    this.idRichiesta = this.richiestaAutorizzazioneService.addRichiesta(this.formData).subscribe(richieste => this.richiesta.push(richieste));
    console.log('id richiesta: ' + this.idRichiesta);
  }

  getAllTipoRichiesta() {
    this.richiestaAutorizzazioneService.getAllTipoRichiesta().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiRichiesta = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di assenza:', error);
      }
    );
  }

  chiudiForm() {
    console.log('Chiusura della finestra');
    this.router.navigate(['/homepage']);
  }

  eliminaRichiesta() {
    console.log('Elimina premuto, pulisco campi ');
    this.formData = {
      //  RiasRichiestaassenzaid: null,
      //  RiasFkPersonaid: null,
      RiasFkTiporichiesta: 0,
      //  RiasFkResponsabileidApprovazione: null,
      //  RiasApprovato: false,
      OraFine: null,
      OraInizio: null,
      DataFine: '',
      DataInizio: '',
      RiasNote: '',
      RiasSysuser: 'Edo',
      //  RiasSysdate: '',
      //  RiasFlagattivo: false,
      //AndpDocumentipersonas: '',
    };
  }
}


