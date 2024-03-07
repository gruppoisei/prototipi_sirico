import { Component, ViewChild, ElementRef, input, InputFunction } from '@angular/core';
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
  OraFine: any = null;
  OraInizio: any = null;
  DataFine: string = '';
  DataInizio: string = '';
  fileInput: any;
  idRichiesta: any;
  ore: string[] = [];
  richiesta: Richiesta[] = [];
  tipiRichiesta: [{ ritrTiporichiestaassenzaid: number; ritrDescrizioneassenza: string }] | undefined;
  formData: Richiesta = {
    //  RiasFkPersonaid: null,
    RiasFkTiporichiesta: 1,
    //  RiasFkResponsabileidApprovazione: null,
    //  RiasApprovato: false,
    RiasDataorainizioassenza: '',
    RiasDataorafineassenza: '',
    RiasNote: '',
    RiasSysuser: 'Edo',
    //  RiasSysdate: '',
    //  RiasFlagattivo: false,
    //AndpDocumentipersonas: '',
    fileName:'',
    filePath:''
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private richiestaAutorizzazioneService: RichiestaAutorizzazioneService,
    private elementRef: ElementRef
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
    this.formData.RiasDataorainizioassenza = this.DataInizio + 'T' + this.OraInizio + ':00';
    this.formData.RiasDataorafineassenza = this.DataFine + 'T' + this.OraFine + ':00';
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
  

   ngAfterViewInit() {
    this.fileInput = this.elementRef.nativeElement.querySelector('#fileInput');
  }

  uploadDoc() {     //ATTENZIONE: IL BACKEND NON SI ASPETTA QUESTI CAMPI, LI IGNORERÀ!!
    const inputElement: HTMLInputElement = this.fileInput;
    const file: File | null = inputElement.files ? inputElement.files[0] : null;
    if (file) {
      this.formData.fileName = file.name;
      this.formData.filePath = URL.createObjectURL(file);
      console.log('Nome del file:', this.formData.fileName);
      console.log('Percorso del file:', this.formData.filePath);
    }
  } 


  chiudiForm() {
    console.log('Chiusura della finestra');
    this.router.navigate(['/homepage']);
  }

  eliminaRichiesta() {
    console.log('Elimina premuto, pulisco campi '); 
    this.OraFine = null;
    this.OraInizio = null;
    this.DataFine = '';
    this.DataInizio = '';
    this.formData = {
      //  RiasRichiestaassenzaid: null,
      //  RiasFkPersonaid: null,
      RiasFkTiporichiesta: 0,
      //  RiasFkResponsabileidApprovazione: null,
      //  RiasApprovato: false,
      RiasDataorainizioassenza: '',
      RiasDataorafineassenza: '',
      RiasNote: '',
      RiasSysuser: 'Edo',
      //  RiasSysdate: '',
      //  RiasFlagattivo: false,
      //AndpDocumentipersonas: '',
      fileName:'',
      filePath:''
    };
  }
}

function uploadDoc(input: InputFunction) {
  throw new Error('Function not implemented.');
}

