import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GiornoLavorativo } from '../../../dto/response/giorno-lavorativo';


@Component({
  selector: 'app-attivita-giorno',
  templateUrl: './attivita-giorno.component.html',
  styleUrl: './attivita-giorno.component.scss',
  standalone:true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class AttivitaGiornoComponent {
  constructor(
    public dialogRef: MatDialogRef<AttivitaGiornoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiornoLavorativo,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

