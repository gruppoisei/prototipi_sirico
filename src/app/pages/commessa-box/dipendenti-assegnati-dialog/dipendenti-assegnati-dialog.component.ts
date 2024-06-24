import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { DeleteCommperbyidDialogComponent } from '../delete-commperbyid-dialog/delete-commperbyid-dialog.component';
import { DeleteCommperbyidsDialogComponent } from '../delete-commperbyids-dialog/delete-commperbyids-dialog.component';
import { vistaPersoneCommessa } from '../../../dto/request/vistaPersoneCommessa';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { DialogRef } from '@angular/cdk/dialog';
import { Observable, of, tap } from 'rxjs';
import { commessaPersona } from '../../../dto/request/commessaPersona';
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

constructor(@Inject(MAT_DIALOG_DATA) public listVistaPersoneCommessa: any, private commessaService: CommessaService, private dialog: MatDialog, private dialogRef: MatDialogRef<DipendentiAssegnatiDialogComponent>, public menuDinamicoService: MenuDinamicoService)
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
    console.log(this.listDipendenti)
    this.dialog.open(DeleteCommperbyidDialogComponent,
      {
        data: {id: id},
        width: 'auto',
        height: 'auto'
      }).afterClosed().subscribe(()=>
        {
          this.aggiornaListaDipendenti(commessaId).subscribe((data)=>
          {
            this.listDipendenti = data;
          })
          this.dialogRef.close();
          this.dialog.open(DipendentiAssegnatiDialogComponent,
            {
              data: this.listDipendenti,
              width: 'auto',
              height: 'auto'
            });
        });
  }

  eliminaSelezionati(): void {
    this.dialog.open(DeleteCommperbyidsDialogComponent,
      {
        data: {ids: this.selectedDipendenti},
        width: 'auto',
        height: 'auto'
      }).afterClosed().subscribe(()=> {
        this.dialog.open
      });
  }

  modificaSelezionati(): void {
    this.commessaService.fetchCommessaPersoneByIds(this.selectedDipendenti)
    }

  aggiornaListaDipendenti(commessaId: number | undefined): Observable<vistaPersoneCommessa[]> {
    if (commessaId !== undefined) {
      return this.commessaService.getVistaPersoneCommessaById(commessaId).pipe(
        tap((data) => {
          this.checkboxStates = new Array(this.listDipendenti.length).fill(false);
          this.selectedDipendenti = [];
          this.masterCheckbox = false;
          this.isAnySelected = false;
          return data;
        })
      );
    } else {
      return of();
    }
  }

    setTitoloModificaAssegnazioneCommessa()
    {
      this.commessaService.setTitolo('Modifica date commessa assegnata')
    }
}
