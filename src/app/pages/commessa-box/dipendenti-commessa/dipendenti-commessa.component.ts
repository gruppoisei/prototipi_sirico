import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCalendar, MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import { PersonaService } from '../../../service/persona.service';


@Component({
  selector: 'app-dipendenti-commessa',
  templateUrl: './dipendenti-commessa.component.html',
  styleUrl: './dipendenti-commessa.component.scss'
})
export class DipendentiCommessaComponent implements OnInit {
listCommesse: any;
date: any;
pickerRequired: MatDatepicker<any> | MatCalendar<any> | undefined;
assegnaCommessaForm!: FormGroup;
datiDipendenti: any;

constructor(private fb : FormBuilder, private personaService : PersonaService){
}
  ngOnInit(): void {
    this.assegnaCommessaForm = this.fb.group({

      commessa: ['', Validators.required],
      dateAssegnate : ['', Validators.required],
      FlagOreLavorative : [true],
      oreGiornaliere : [8],
    })
    this.getPersoneSocieta()
  }

  getPersoneSocieta(){
    this.personaService.getPersoneSocieta().subscribe(res =>{
      this.datiDipendenti = res.sort((a: { ansoRagionesociale: string; },b: { ansoRagionesociale: string; }) => a.ansoRagionesociale > b.ansoRagionesociale ? 1:-1);
    })
  }

}
