import { identifierName } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';

@Component({
  selector: 'app-dipendenti-assegnati-dialog',
  templateUrl: './dipendenti-assegnati-dialog.component.html',
  styleUrl: './dipendenti-assegnati-dialog.component.scss'
})
export class DipendentiAssegnatiDialogComponent {

  listDipendenti: any [] = [];
  checkboxStates: boolean[] = [];
  selectedDipendenti: number[] = [];

constructor(@Inject(MAT_DIALOG_DATA) public listVistaPersoneCommessa: any, private commessaService: CommessaService)
{
  this.listDipendenti = listVistaPersoneCommessa;
  this.checkboxStates = new Array(this.listDipendenti.length).fill(false);
  console.log(this.listDipendenti)
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
  }

  modificaSelezionati() {
    this.commessaService.getCommessaPersoneByIds(this.selectedDipendenti).subscribe(
      {
        next: (res) =>
          {
            console.log(res)
          }
      });
    }
}
