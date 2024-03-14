import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestione-contratto',
  templateUrl: './gestione-contratto.component.html',
  styleUrl: './gestione-contratto.component.scss'
})
export class GestioneContrattoComponent implements OnInit{

  ricercaForm!: FormGroup;
  constructor(private fb : FormBuilder){}

  ngOnInit(): void {

    this.ricercaForm = this.fb.group({
      nome : [''],
      cognome : [''],
      codiceFiscale : [''],      
      societa : ['']
  })
   }

  clearSearch()
  {
    this.ricercaForm.reset();
  }
      
  ricercaFiltrata()
  {

  }

}