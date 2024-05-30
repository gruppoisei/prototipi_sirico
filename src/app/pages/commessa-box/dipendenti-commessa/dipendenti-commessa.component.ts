import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCalendar, MatDatepicker} from '@angular/material/datepicker';
import { PersonaService } from '../../../service/persona.service';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import {MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/it';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { commessaPersona } from '../../../dto/request/commessaPersona';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-dipendenti-commessa',
  templateUrl: './dipendenti-commessa.component.html',
  styleUrl: './dipendenti-commessa.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it' },
    provideMomentDateAdapter() // Imposta la localizzazione italiana
  ]
})
export class DipendentiCommessaComponent implements OnInit, OnDestroy {

  titolo: string;
  pickerRequired: MatDatepicker<any> | MatCalendar<any> | undefined;
  assegnaCommessaForm!: FormGroup;
  commper : boolean = false
  _commper : boolean = false
  dataInizio : any
  dataFine : any
  minDate : any
  maxDate : any
  listaCommesse: any[] = [];
  datiDipendenti: any[] = [];
  _datiDipendenti: any[] = [];
  dipendentiSelezionati : any[] = [];
  _dipendentiSelezionati : any [] = []
  checkBoxStatus: {[id: number]: boolean} = {};
  commessaPersona : commessaPersona[] = []
  _commessaPersona : commessaPersona[] = []
  listaPersone : any[] = []

  currentPage: number = 1;
  elementiPerPagina: number = 10;
  _currentPage: number = 1;
  _elementiPerPagina: number = 10;
  totalPages : number = 0;
  _totalPages : number = 0;
  formDefaultValue: any;
  startDate:{[key: number]: string | null} = {};

  
constructor
(
  private fb : FormBuilder, private personaService : PersonaService,
  private commessaService : CommessaService, private location : Location,
  private dialog : MatDialog
)
  {
    const router = inject(Router)
    this.titolo = this.commessaService.getTitolo();
    if(this.titolo === '')
      {
        router.navigate(['/Segreteria/gestione-assegnazione-commessa'])
      }
  }
  
ngOnDestroy(): void {
  this.commessaService.clearCommessaPersona();
 }

  ngOnInit(): void {
    this.assegnaCommessaForm = this.fb.group({
      commessa: ['', Validators.required],
      dateRange: this.fb.group({
        dataInizio: ['', Validators.required],
        dataFine: ['']}),
    });

    this.commessaService.commper$.pipe(
      distinctUntilChanged()
    ).subscribe({
      next: (commper) => {
        if (commper) {
          this.commessaPersona.push(commper)
          this.commper = true;
          this.listaPersone = []
          this.commessaService.getCommessaPersonaSocietaById(commper.id).subscribe({
            next: (res) => {
              if (!this.listaPersone.some(persona => persona.id === res.id)){
                this.listaPersone.push(res);
              }
            }
          });
        }
      }
    });

    this.commessaService._commper$.subscribe((_commper)=>{
      if(_commper){
        this.commessaPersona = _commper,
        this._commper = true;
        this.listaPersone = [];
        const ids = _commper.map((commper: any)=> commper.id);
        this.commessaService.getCommessaPersoneSocietaByIds(ids).subscribe(res => {
          this.listaPersone = res;
        })
        
      }
    })

    this.getPersoneSocieta()
    this.getCommesse()
    this.formDefaultValue = this.assegnaCommessaForm.getRawValue()
  }

  modificaCommessaPersona(){
    if(this.listaPersone !== null && this.commessaPersona !== null){
      this.listaPersone.forEach(persona =>{
        const commper = this.commessaPersona.find(cp => cp.personaId ===  persona.personaId);
        if(commper){
          commper.dataInizio = persona.dataInizio ? this.convertiStringInDate(persona.dataInizio) : commper.dataInizio;
          commper.dataFine = persona.dataFine ? this.convertiStringInDate(persona.dataFine) : commper.dataFine;
        }
      })
      this.commessaService.modificaCommessaPersona(this.commessaPersona).subscribe({
        next: (res) =>{
          this.dialog.open(MessageResponseDialogComponent,
            {
              data: {successMessage : res.message},
              width : 'auto',
              height : 'auto'
            });
            this.resetDate()
        }, 
        error : (err) =>{
          this.dialog.open(MessageResponseDialogComponent,
            {
              data :{successMessage : err.message},
              width : 'auto',
              height : 'auto'
            });
        }
      });
    }
  }

  salvaCommessaPersona() {
        if(this.assegnaCommessaForm.valid){
          debugger
            const dataInizioMoment: moment.Moment = this.assegnaCommessaForm.get('dateRange.dataInizio')?.value;
            const dataFineMoment: moment.Moment = this.assegnaCommessaForm.get('dateRange.dataFine')?.value;
            const dataInizioDate: Date | null = this.convertiMomentInDate(dataInizioMoment);
            const dataFineDate: Date | null = this.convertiMomentInDate(dataFineMoment);
        
            this.dataInizio = this.formattingDate(dataInizioDate);
            this.dataFine = this.formattingDate(dataFineDate);
            const commessaId = this.assegnaCommessaForm.get('commessa')?.value;
        
            for(const persona of this._dipendentiSelezionati){
              this.commessaPersona.push({
                personaId: persona.anpePersonaid,
                commessaId: commessaId,
                dataInizio: this.dataInizio,
                dataFine: this.dataFine,
                flagAttivo: true
              });
            }
              this.commessaService.salvaCommessaPersona(this.commessaPersona).subscribe(
                {
                  next: (res)=>{
                    this.dialog.open(MessageResponseDialogComponent,
                      {
                        data :{successMessage : res.message},
                        width : 'auto',
                        height : 'auto'
                      });
                      this.commessaPersona = [];
                      this.clearForm();
                      this._dipendentiSelezionati = []
                      this.dipendentiSelezionati = []
                  },
                  error : (err) =>{
                    this.dialog.open(MessageResponseDialogComponent,
                      {
                        data : {errorMessage : err?.error.message},
                        width : 'auto',
                        height : 'auto'
                      });
                  }
                });
        }
        else{
          this.assegnaCommessaForm.markAllAsTouched();
          ValidateForm.validateAllFormFields(this.assegnaCommessaForm);
          this.dialog.open(ResponseDialogComponent,
            {
              width : 'auto',
              height : 'auto'
            });
      }
    }

  updateDate(event: Event, persona: any, field: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (field === 'dataInizio') {
      persona.dataInizio = this.convertiStringInDate(value);
      } else if (field === 'dataFine') {
          persona.dataFine = this.convertiStringInDate(value);
      }
  }
  
  convertiStringInDate(dateString: string): Date {
      return new Date(dateString);
  }
  
convertiMomentInDate(momentObject: moment.Moment | string): Date | null {
  if (typeof momentObject === 'string') {
    if (momentObject.trim() === '') {
      return null;
    }
    const date = moment(momentObject);
    return date.isValid() ? date.toDate() : null;
  }
  
  if (moment.isMoment(momentObject)) {
    return momentObject.toDate();
  }
  
  return null;
}

  nextPage(){
    if(this.currentPage < this.getTotalPages()){
      this.currentPage++;
      this.cambiaPagina(this.currentPage); // Emetti l'evento per il cambio di pagina
    }
  }

  caricaDatiPaginati() {
    const startIndex = (this.currentPage - 1) * this.elementiPerPagina;
    const endIndex = startIndex + this.elementiPerPagina;
    this._datiDipendenti = this.datiDipendenti.slice(startIndex, endIndex);
  }

  cambiaElementiPerPagina(itemsPerPage: number) {
    this.elementiPerPagina = itemsPerPage;
    this.caricaDatiPaginati();
  }

  cambiaPagina(page: number) {
    this.currentPage = page;
    this.caricaDatiPaginati();
  }

  getTotalPages() {
    return Math.ceil(this.datiDipendenti.length / this.elementiPerPagina);
  }

  _caricaDatiPaginati(){
    const startIndex = (this._currentPage -1)* this._elementiPerPagina;
    const endIndex = startIndex + this._elementiPerPagina;
    this._dipendentiSelezionati = this.dipendentiSelezionati.slice(startIndex, endIndex)
  }

  _nextPage(){
    if(this._currentPage < this._getTotalPages()){
      this._currentPage++;
      this._cambiaPagina(this._currentPage);
    }
  }

  _cambiaElementiPerPagina(itemsPerPage: number) {
    this._elementiPerPagina = itemsPerPage;
    this._caricaDatiPaginati();
  }

  _cambiaPagina(page: number) {
    this._currentPage = page;
    this._caricaDatiPaginati();
  }

  _getTotalPages() {
    return Math.ceil(this.dipendentiSelezionati.length / this._elementiPerPagina);
  }

  getCommesse() {
    this.commessaService.getAllVistaCommesse().subscribe(res => {
      this.listaCommesse = res})
  }

  getPersoneSocieta(){
    this.personaService.getPersoneSocieta().subscribe(res =>{
      this.datiDipendenti = res.sort((a: { ansoRagionesociale: string; },b: { ansoRagionesociale: string; }) => a.ansoRagionesociale > b.ansoRagionesociale ? 1:-1);
      this.totalPages = this.getTotalPages();
      this.caricaDatiPaginati()
    })
  }

  addDipendenteSelezionato(dipendente: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendente.anpePersonaid);
    if (index === -1) {
        this.dipendentiSelezionati.push(dipendente);
        this.checkBoxStatus[dipendente.anpePersonaid] = true;
        this._caricaDatiPaginati();
    }
  }

  removeDipendenteSelezionato(dipendenteSelezionato: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendenteSelezionato.anpePersonaid);
    if (index !== -1) {
        this.dipendentiSelezionati.splice(index, 1);
        this.checkBoxStatus[dipendenteSelezionato.anpePersonaid] = false;
        this._caricaDatiPaginati();
    }
  }

  onCommessaChange(commessaId : any){
    const idCommessa = parseInt(commessaId, 10)
    const minDate = this.getMinDate(idCommessa);
    const maxDate = this.getMaxDate(idCommessa) !< minDate ? null : this.getMaxDate(idCommessa)
    this.minDate = this.formattingDate(minDate)
    this.maxDate = this.formattingDate(maxDate)
  }

  setMinMaxDate(commessaId : number){
    const minDate = this.getMinDate(commessaId);
    const maxDate = this.getMaxDate(commessaId);
    this.minDate = this.formattingDate(minDate);
    this.maxDate = this.formattingDate(maxDate)
  }

  getMinDate(idCommessa: any): Date{
    const commessa = this.listaCommesse.find(com => com.commessaId === idCommessa);
    let dataInizio = new Date()
    if(commessa){
      dataInizio = new Date(commessa.dataInizio)
    }
    return dataInizio
  }

  getMaxDate(idCommessa: any): Date | null{
    const commessa = this.listaCommesse.find(com => com.commessaId === idCommessa);
    if(commessa.dataFine !== null){
      return new Date(commessa.dataFine);
    }
    return null
  }
  
  updateEndDateMin(startDate : Event, id : number){
    const input = startDate.target as HTMLInputElement;
    this.startDate[id] = input.value;
  }

  isDataInizioMaggioreDiDataFine():boolean{
    for(const cps of this.listaPersone){
      if(cps.dataInizio > cps.dataFine){
        return true;
      }
    }
    return false;
  }

  formattingDate(date: Date | null | string): string | null {
    if (!date) {
      return null;
    }
  
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    const y = date.getFullYear();
    const m = ("0" + (date.getMonth() + 1)).slice(-2);
    const d = ("0" + date.getDate()).slice(-2);
  
    return `${y}-${m}-${d}`;
  }

  goBack() {
    this.location.back();
  }

  clearForm() {
    this.assegnaCommessaForm.reset(this.formDefaultValue)
    this.dipendentiSelezionati = []
  }
  
  resetDate(){
    this.listaPersone.forEach((item) => {
      const commper = this.commessaPersona.find(cp => cp.personaId === item.personaId);
      if (commper){
        item.dataInizio = commper.dataInizio;
        item.dataFine = commper.dataFine;
      }
    })
    this.startDate = {};
  }
}
