import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCalendar, MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { PersonaService } from '../../../service/persona.service';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dipendenti-commessa',
  templateUrl: './dipendenti-commessa.component.html',
  styleUrl: './dipendenti-commessa.component.scss'
})
export class DipendentiCommessaComponent implements OnInit {

  date: any;
  pickerRequired: MatDatepicker<any> | MatCalendar<any> | undefined;
  assegnaCommessaForm!: FormGroup;
  datiDipendenti: any[] = [];
  paginaCorrente: number = 1;
  elementiPerPagina: number = 10;
  dipendentiSelezionati : any[] = [];
  checkBoxStatus: {[id: number]: boolean} = {};
  listaCommesse: any[] = [];
  formDefaultValue: any;
  datiDipendentiPaginati: any[] = [];
  totalPages : number = 0

constructor(private fb : FormBuilder, private personaService : PersonaService, private commessaService : CommessaService, private location : Location){
}
  ngOnInit(): void {
    this.assegnaCommessaForm = this.fb.group({

      commessa: ['', Validators.required],
      dateAssegnate : ['', Validators.required],
      FlagOreLavorative : [true],
      oreGiornaliere : [8],
    })
    this.getPersoneSocieta()
    this.getCommesse()
    this.caricaDatiPaginati()
    this.formDefaultValue = this.assegnaCommessaForm.getRawValue()
  }

  calcolaIndiciPagina(): {startIndex: number, endIndex: number}{
    const startIndex = (this.paginaCorrente-1)* this.elementiPerPagina;
    let endIndex = startIndex + this.elementiPerPagina -1;
    endIndex = endIndex >= this.datiDipendenti.length ? this.datiDipendenti.length - 1 : endIndex;
    return {startIndex, endIndex}
  }

  nextPage(){
    if(this.paginaCorrente < this.getTotalPages()){
      this.paginaCorrente++;
      this.cambiaPagina(this.paginaCorrente); // Emetti l'evento per il cambio di pagina
    }
  }

  cambiaElementiPerPagina(itemsPerPage: number) {
    this.elementiPerPagina = itemsPerPage;
    this.caricaDatiPaginati();
  }

  cambiaPagina(page: number) {
    this.paginaCorrente = page;
    this.caricaDatiPaginati();
  }

  caricaDatiPaginati() {
    const startIndex = (this.paginaCorrente - 1) * this.elementiPerPagina;
    const endIndex = startIndex + this.elementiPerPagina;
    this.datiDipendentiPaginati = this.datiDipendenti.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.datiDipendenti.length / this.elementiPerPagina);
  }

  goBack() {
    this.location.back();
  }

  clearForm() {
    this.assegnaCommessaForm.reset(this.formDefaultValue)
  }

  getCommesse() {
    this.commessaService.getAllVistaCommesse().subscribe(res => {
      this.listaCommesse = res
    })
  }

  getPersoneSocieta(){
    this.personaService.getPersoneSocieta().subscribe(res =>{
      this.datiDipendenti = res.sort((a: { ansoRagionesociale: string; },b: { ansoRagionesociale: string; }) => a.ansoRagionesociale > b.ansoRagionesociale ? 1:-1);
    })
  }

  addDipendenteSelezionato(dipendente: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendente.anpePersonaid);
    if (index === -1) {
        this.dipendentiSelezionati.push(dipendente);
        this.checkBoxStatus[dipendente.anpePersonaid] = true;
    }
  }

  removeDipendenteSelezionato(dipendenteSelezionato: any){
    const index = this.dipendentiSelezionati.findIndex((d) => d.anpePersonaid === dipendenteSelezionato.anpePersonaid);
    if (index !== -1) {
        this.dipendentiSelezionati.splice(index, 1);
        this.checkBoxStatus[dipendenteSelezionato.anpePersonaid] = false;
    }
  }

}
