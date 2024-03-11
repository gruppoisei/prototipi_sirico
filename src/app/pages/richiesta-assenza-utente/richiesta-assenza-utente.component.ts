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
    RiasFkTiporichiesta: 1,
    RiasDataorainizioassenza: '',
    RiasDataorafineassenza: '',
    RiasNote: '',
    RiasSysuser: 'Edo',
    fileName: ''
  };
  dateinizioFileTouched: boolean = false;
  datefineFileTouched: boolean = false;
  orainizioFileTouched: boolean = false;
  orafineFileTouched: boolean = false;
 
  @ViewChild('myFile')
  myInputFile!: ElementRef;
 
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
    for (let i = 0; i < 24; i++) {
      this.ore.push(`${('0' + i).slice(-2)}:00`);
      this.ore.push(`${('0' + i).slice(-2)}:30`);
    }
  }
 
  submitForm() {
    this.formData.RiasDataorainizioassenza = this.DataInizio + 'T' + this.OraInizio + ':00';
    this.formData.RiasDataorafineassenza = this.DataFine + 'T' + this.OraFine + ':00';
    this.inviaRichiesta(this.formData);
    this.resetForm();
  }
 
  inviaRichiesta(body: Richiesta){
    this.richiestaAutorizzazioneService.addRichiesta(body).subscribe(
      (response: any) => {
        console.log(response);
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
    this.router.navigate(['/homepage']);
  }
 
  eliminaRichiesta() {
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
    this.formData = {
      RiasFkTiporichiesta: 0,
      RiasDataorainizioassenza: '',
      RiasDataorafineassenza: '',
      RiasNote: '',
      RiasSysuser: 'Edo',
      fileName: ''
    };
    this.resetDoc();
    this.dateinizioFileTouched = false;
    this.datefineFileTouched = false;
    this.orainizioFileTouched = false;
    this.orafineFileTouched = false;
  }
 
  checkFormValidity(): boolean {
    return (
      this.formData.RiasFkTiporichiesta &&
      this.DataInizio &&
      this.DataFine &&
      this.OraInizio &&
      this.OraFine &&
      this.formData.RiasNote
    );
  }
 
  checkDateTimeValidity(): boolean {
    const startDate = new Date(this.DataInizio + 'T' + this.OraInizio);
    const endDate = new Date(this.DataFine + 'T' + this.OraFine);
 
    return ((startDate > endDate) && (this.dateinizioFileTouched && this.datefineFileTouched && this.orainizioFileTouched && this.orafineFileTouched));
  }
 
 
}


