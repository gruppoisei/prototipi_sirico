import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertUtenteService } from '../../../../service/insert-utente.service';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-cerca-persona-senza-utente',
  templateUrl: './cerca-persona-senza-utente.component.html',
  styleUrl: './cerca-persona-senza-utente.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
})
export class CercaPersonaSenzaUtenteComponent {
  dipendentiSenzaUtenza: any[] = [];

  filtroRicerca:any = {nome: null,cognome:null,codiceFiscale:null} 

  constructor(
    private utenteService: InsertUtenteService,
    public dialogRef: MatDialogRef<CercaPersonaSenzaUtenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dipendentiSenzaUtenza = []
  }

  ricercaFiltrata() {
    console.log(this.filtroRicerca)
    this.utenteService.GetAllPersoneSenzaUtenza(this.filtroRicerca
      ).subscribe(
        
      (response: any) => {
        console.log("aaaa")
        console.log(response);
        if(response == null) this.dipendentiSenzaUtenza = []
        else this.dipendentiSenzaUtenza = response;
      },
      (error: any) => {
        console.error(
          'Errore durante il recupero dei tipi di contratto:',
          error
        );
      }
    );
  }

  selezionaPersona(dipendente:any)
  {
    
    this.data = dipendente
    
  }

  clearSearch() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.data = {
        anpeNome: null,
        anpeCognome: null,
        anpeCodicefiscale: null,
        anpePersonaid:-1
      };
    } else {
      console.log('Operazione annullata');
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
