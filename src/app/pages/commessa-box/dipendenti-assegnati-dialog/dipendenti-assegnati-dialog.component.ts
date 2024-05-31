import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { DeleteCommperbyidDialogComponent } from '../delete-commperbyid-dialog/delete-commperbyid-dialog.component';
import { DeleteCommperbyidsDialogComponent } from '../delete-commperbyids-dialog/delete-commperbyids-dialog.component';
import { vistaPersoneCommessa } from '../../../dto/request/vistaPersoneCommessa';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-dipendenti-assegnati-dialog',
  templateUrl: './dipendenti-assegnati-dialog.component.html',
  styleUrl: './dipendenti-assegnati-dialog.component.scss'
})
export class DipendentiAssegnatiDialogComponent {

  listDipendenti: vistaPersoneCommessa [] = [];
  checkboxStates: boolean[] = [];
  masterCheckbox: boolean = false;
  isAnySelected: boolean = false;
  selectedDipendenti: number[] = [];

constructor(@Inject(MAT_DIALOG_DATA) public listVistaPersoneCommessa: any, private commessaService: CommessaService, private dialog: MatDialog, public menuDinamicoService: MenuDinamicoService)
{
  this.listDipendenti = listVistaPersoneCommessa;
  this.checkboxStates = new Array(this.listDipendenti.length).fill(false);

  this.menuDinamicoService.getPermissionFlag();
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
      this.isAnySelected = false;
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
        });
  }

  eliminaSelezionati(commessaId: number | undefined): void {
    console.log(this.listDipendenti)
    this.dialog.open(DeleteCommperbyidsDialogComponent,
      {
        data: {ids: this.selectedDipendenti},
        width: 'auto',
        height: 'auto'
      }).afterClosed().subscribe(()=> {
        this.aggiornalistaDipendenti(commessaId)
      });
  }

  modificaSelezionati(): void {
    this.commessaService.fetchCommessaPersoneByIds(this.selectedDipendenti)
    }

  aggiornalistaDipendenti(commessaid:number | undefined):void{
    if(commessaid !== undefined){
      this.commessaService.getVistaPersoneCommessaById(commessaid).subscribe((data)=>
        {
          this.listDipendenti = data;
          this.checkboxStates = new Array(this.listDipendenti.length).fill(false);
          this.selectedDipendenti = [];
          this.masterCheckbox = false;
        })
    }
    }

    setTitoloModificaAssegnazioneCommessa()
    {
      this.commessaService.setTitolo('Modifica date commessa assegnata')
    }
}
