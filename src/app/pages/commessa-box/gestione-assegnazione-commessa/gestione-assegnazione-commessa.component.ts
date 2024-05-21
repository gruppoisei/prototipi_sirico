import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SocietaService } from '../../../service/societa.service';
import { CommessaService } from '../../../service/commessa.service';

@Component({
  selector: 'app-gestione-assegnazione-commessa',
  templateUrl: './gestione-assegnazione-commessa.component.html',
  styleUrl: './gestione-assegnazione-commessa.component.scss'
})
export class GestioneAssegnazioneCommessaComponent implements OnInit{

  ricercaForm!: FormGroup;
  isDisabled: boolean = true;
  formDefaultValue : any;
  minDataScadenza ?: string
  constructor(private fb : FormBuilder, private commessaService : CommessaService, private societaService : SocietaService,  private dialog : MatDialog){}
  datiCommessa: any[] = []
  idCommessa : number | null = null;
  listSocieta: any
  listCommessa: any;

  ngOnInit(): void {
    this.loadData()
    this.ricercaForm = this.fb.group({
      CommessaId : [0],
      idCommessa : ['', Validators.required],
      idSocieta : ['', Validators.required],
      DataInizio : ['', Validators.required],
      DataFine : ['', Validators.required],
    })
    this.formDefaultValue = this.ricercaForm.getRawValue()
    this.ricercaForm.get('DataInizio')?.valueChanges.subscribe(value => {
      if(value)
        {
          this.ricercaForm.get('DataFine')?.enable();
          const selectDate = new Date(value);
          this.minDataScadenza = selectDate.toISOString().split('T')[0]
        }
    });
  }

  loadData(){
    this.societaService.getAllSocieta().subscribe(societa => this.listSocieta = societa);
    this.commessaService.getAllCommesse().subscribe(Commessa => this.listCommessa = Commessa)
  }

  /*setTitoloModificaCommessa()
    {
      this.commessaService.setTitolo('Modifica commessa')
    }

  getCommessa(commessaId: number)
  {
    this.idCommessa = commessaId;
    this.commessaService.getCommessaById(this.idCommessa)
  }*/

  setTitoloNuovaCommessa()
  {
    /*this.commessaService.setTitolo('Inserimento nuova commessa')*/
  }

    clearSearch()
  {
    this.ricercaForm.reset();
  }

  /*openDialogDelete(commessaId : number) {
    this.idCommessa = commessaId
    this.dialog.open(DeleteCommessaDialogComponent,
      {
        data: {commessaId: this.idCommessa},
        width: 'auto',
        height: 'auto'
      })
      .afterClosed().subscribe(() =>
        {
          this.ricercaFiltrata();
        })
    }

    ricercaFiltrata() {
      const queryParams : ricercaCommessa = this.ricercaForm.value;
  
      this.commessaService.getVistaCommessaFiltrata(queryParams)
    .subscribe(
      {
        next:(res) => 
        {
          console.log(res)
          this.datiCommessa = res.map((commessa : any)=>({
            commessaId: commessa.commessaId,
            commessa: commessa.commessa,
            tipoCommessa: commessa.tipoCommessa,
            societa: commessa.societa,
            clienteDiretto: commessa.clienteDiretto,
            clienteFinale: commessa.clienteFinale,
            dataInizio: FormattaData.formattaData(commessa.dataInizio),
            dataFine: FormattaData.formattaData(commessa.dataFine),
            note: commessa.note,
            flagAttivo: commessa.flagAttivo,
          }));
        },
        error:(err) =>
        {
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width: 'auto',
              height: 'auto'
            });
        }
      });
    }*/


}
