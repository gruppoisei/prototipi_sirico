import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modale-testi-aspetti',
  templateUrl: './modale-testi-aspetti.component.html',
  styleUrl: './modale-testi-aspetti.component.scss'
})
export class ModaleTestiAspettiComponent {

  constructor(
    public dialogRef: MatDialogRef<ModaleTestiAspettiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
