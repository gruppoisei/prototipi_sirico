import { identifierName } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { DeleteCommperbyidDialogComponent } from '../delete-commperbyid-dialog/delete-commperbyid-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dipendenti-assegnati-dialog',
  templateUrl: './dipendenti-assegnati-dialog.component.html',
  styleUrl: './dipendenti-assegnati-dialog.component.scss'
})
export class DipendentiAssegnatiDialogComponent {

  listDipendenti: any [] = [];
  checkboxStates: boolean[] = [];
  masterCheckbox: boolean = false;
  isAnySelected: boolean = false;
  selectedDipendenti: number[] = [];

constructor(@Inject(MAT_DIALOG_DATA) public listVistaPersoneCommessa: any, private commessaService: CommessaService, private dialog: MatDialog)
{
  this.listDipendenti = listVistaPersoneCommessa;
  this.checkboxStates = new Array(this.listDipendenti.length).fill(false);
}

disableButton(index: any, commessapersonaId:number):void {
  this.checkboxStates[index] = !this.checkboxStates[index];
  if(index.target.checked)
    {
      this.selectedDipendenti.push(commessapersonaId)
    }
    else
    {
      const indice = this.selectedDipendenti.indexOf(commessapersonaId);
      if(indice > -1)
        {
          this.selectedDipendenti.splice(indice,1)
        }
    }
    this.isAnySelected = this.selectedDipendenti.length > 0;
  }

  toggleAllCheckboxes(event: any): void{
    this.masterCheckbox = event.target.checked;
    this.checkboxStates = this.checkboxStates.map(() => this.masterCheckbox);

    if(this.masterCheckbox){
      this.selectedDipendenti = this.listDipendenti.map(d => d.id);
      this.isAnySelected = true
    }
    else{
      this.selectedDipendenti = [];
    }
  }

  modificaSelezionato(id: any): void{
    this.commessaService.fetchCommessaPersonaById(id)
  }

  eliminaSelezionato(id: any, commessaId: number): void{
    this.dialog.open(DeleteCommperbyidDialogComponent,
      {
        data: {id: id},
        width: 'auto',
        height: 'auto'
      }).afterClosed().subscribe(()=>
        {
          this.aggiornalistaDipendenti(commessaId);
        })
      
  }

  eliminaSelezionati(): void {
    
  }

  modificaSelezionati(): void {
    this.commessaService.fetchCommessaPersoneByIds(this.selectedDipendenti)
    }

  aggiornalistaDipendenti(commessaid:number):void{
    this.commessaService.getVistaPersoneCommessaById(commessaid).subscribe((data)=>
      {
        this.listDipendenti = data;
        this.checkboxStates = new Array(this.listDipendenti.length).fill(false);
        this.selectedDipendenti = [];
        this.masterCheckbox = false;
      })
    }
}
