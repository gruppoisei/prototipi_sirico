import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Richiesta } from '../../../dto/request/assenze';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RichiestaAutorizzazioneService } from '../../../service/richiesta-autorizzazione.service';
import { RapportinoService } from '../../../service/rapportino.service';
import { AttivitaGiornoCalendario } from '../../../dto/request/calendario';
import { AuthenticationService } from '../../../service/authentication.service';
import { NuovaRichiestaAssenzaRequest } from '../../../dto/request/nuovaRichiestaAssenza';

@Component({
  selector: 'app-aggiungi-assenza',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './aggiungi-assenza.component.html',
  styleUrl: './aggiungi-assenza.component.scss'
})
export class AggiungiAssenzaComponent {
  OraFine: any = null;
  OraInizio: any = null;
  DataFine: string = '';
  DataInizio: string = '';
  fileInput: any;
  // idRichiesta: any;
  ore: string[] = [];
  // richiesta: Richiesta[] = [];
  tipiRichiesta: [{ ritrTiporichiestaassenzaid: number; ritrDescrizioneassenza: string }] | undefined;
  formData: NuovaRichiestaAssenzaRequest =  new NuovaRichiestaAssenzaRequest()
  dateinizioFileTouched: boolean = false;
  datefineFileTouched: boolean = false;
  orainizioFileTouched: boolean = false;
  orafineFileTouched: boolean = false;
 

  @Output() nuovaAssenzaInserita =
    new EventEmitter();

  @ViewChild('myFile')
  myInputFile!: ElementRef;
 
  constructor(
    private http: HttpClient,
    private router: Router,
    private richiestaAutorizzazioneService: RichiestaAutorizzazioneService,
    private elementRef: ElementRef,
    private auth:AuthenticationService
  ) {
    this.generaOre();
  }
 
  ngOnInit(): void {
    this.getAllTipoRichiesta();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  }
 
  generaOre() {
    for (let i = 0; i < 24; i++) {
      this.ore.push(`${('0' + i).slice(-2)}:00`);
      this.ore.push(`${('0' + i).slice(-2)}:30`);
    }
  }
 
  submitForm() {
    this.formData.dataOraInizio = this.DataInizio + 'T' + this.OraInizio + ':00';
    this.formData.dataOraFine = this.DataFine + 'T' + this.OraFine + ':00';
    this.inviaRichiesta(this.formData);
    this.resetForm();
  }
 
  inviaRichiesta(body: NuovaRichiestaAssenzaRequest){
    console.log(body)
    body.utenteId = this.auth.utente?.id!
    this.richiestaAutorizzazioneService.addRichiesta(body).subscribe(
      (response: any) => {
        this.nuovaAssenzaInserita.emit()
        alert(response);
      },
      (error: any) => {
        console.error('errore nell\'invio della richiesta: ', error);
      }
    )
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
      console.log('Nome del file:', this.formData.fileName);
    }
  }
  
  chiudiForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
    this.router.navigate(['/Home']);
  }
 
  ResetRichiestaAssenza() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.resetForm();
    } else {
      // Do nothing!
      console.log('Operazione annullata');
    }
 
  }

  resetDoc() {
    console.log(this.myInputFile.nativeElement.files);
    this.myInputFile.nativeElement.value = "";
  }
 
  resetForm() {
    this.OraFine = null;
    this.OraInizio = null;
    this.DataFine = '';
    this.DataInizio = '';
    this.formData = new NuovaRichiestaAssenzaRequest()
    this.resetDoc();
    this.dateinizioFileTouched = false;
    this.datefineFileTouched = false;
    this.orainizioFileTouched = false;
    this.orafineFileTouched = false;
  }
 
  checkFormValidity(): boolean {
    return (
      this.formData.tipoRichiestaId &&
      this.DataInizio &&
      this.DataFine &&
      this.OraInizio &&
      this.OraFine &&
      this.formData.note
    );
  }
 
  checkDateTimeValidity(): boolean {
    const startDate = new Date(this.DataInizio + 'T' + this.OraInizio);
    const endDate = new Date(this.DataFine + 'T' + this.OraFine);
 
    return ((startDate > endDate) && (this.dateinizioFileTouched && this.datefineFileTouched && this.orainizioFileTouched && this.orafineFileTouched));
  }
 
 
}
