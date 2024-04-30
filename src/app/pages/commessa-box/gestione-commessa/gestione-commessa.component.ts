import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestione-commessa',
  templateUrl: './gestione-commessa.component.html',
  styleUrl: './gestione-commessa.component.scss'
})
export class GestioneCommessaComponent implements OnInit{

  ricercaForm!: FormGroup;
  constructor(private fb : FormBuilder, private dialog : MatDialog){}
  datiCommessa: any[] = []
  idCommessa : number | null = null;

  ngOnInit(): void {
    this.ricercaForm = this.fb.group({
      DescCommessa: [''],
      DataInizio: [''],
      DataFine: [''],
      FlagAttivo: ['']
    })
  }

  getCommessa(commessaId: number)
  {
    /*this.idCommessa = commessaId;
    this.commessaService.getCommessaById(this.idCommessa)*/
  }

  setTitoloNuovaCommessa()
  {
    /*this.commessaService.setTitolo('Inserimento nuova commessa')*/
  }

    clearSearch()
  {
    this.ricercaForm.reset();
  }

  ricercaFiltrata()
  {
    
  }

}
