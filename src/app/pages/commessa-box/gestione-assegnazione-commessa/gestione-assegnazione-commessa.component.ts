import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SocietaService } from '../../../service/societa.service';
import { CommessaService } from '../../../service/commessa.service';
import { ricercaCommessaPersona } from '../../../dto/request/ricercaCommessaPersona';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { DipendentiAssegnatiDialogComponent } from '../dipendenti-assegnati-dialog/dipendenti-assegnati-dialog.component';
import { DeleteCommessaDialogComponent } from '../../delete-commessa-dialog/delete-commessa-dialog.component';

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
      commessaId : [0],
      ansoRagionesociale : [null],
      dataInizio : [''],
      dataFine : [''],
      flagAttivo : [true],
    })
    this.formDefaultValue = this.ricercaForm.getRawValue()
    this.ricercaForm.get('dataInizio')?.valueChanges.subscribe(value => {
      if(value)
        {
          this.ricercaForm.get('dataFine')?.enable();
          const selectDate = new Date(value);
          this.minDataScadenza = selectDate.toISOString().split('T')[0]
        }
    });
  }

  loadData(){
    this.societaService.getAllSocieta().subscribe(societa => this.listSocieta = societa);
    this.commessaService.getAllCommesse().subscribe(Commessa => this.listCommessa = Commessa)
  }

  getListaDipendentiAssegnati(commessaId: number) {
    this.commessaService.getVistaPersoneCommessaById(commessaId).subscribe({
      next:(res) =>{
        this.dialog.open(DipendentiAssegnatiDialogComponent,
        {
          data: res,
          width: 'auto',
          height: 'auto'
        });
      }
    });
  }

  setTitoloModificaCommessa()
    {
      this.commessaService.setTitolo('Modifica commessa')
    }

  getCommessa(commessaId: number)
  {
    this.idCommessa = commessaId;
    this.commessaService.getCommessaById(this.idCommessa)
  }

  setTitoloNuovaCommessa()
  {
    this.commessaService.setTitolo('Inserimento nuova commessa')
  }

    clearSearch()
  {
    this.ricercaForm.reset(this.formDefaultValue);
  }

  openDialogDelete(commessaId : number) {
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
      const queryParams : ricercaCommessaPersona = this.ricercaForm.value;
  
      this.commessaService.getVistaCommessaPersonaFiltrata(queryParams)
    .subscribe(
      {
        next:(res) => 
        {
          this.datiCommessa = res
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
    }


}
