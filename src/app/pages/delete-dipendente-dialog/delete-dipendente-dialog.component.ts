import {Component, EventEmitter, Inject} from '@angular/core'
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog'
import {PersonaService} from '../../service/persona.service'
import {DeleteDipendenteResponseDialogComponent} from '../../ui/delete-dipendente-response-dialog/delete-dipendente-response-dialog.component'

@Component({
  selector: 'app-delete-dipendente-dialog',
  templateUrl: './delete-dipendente-dialog.component.html',
  styleUrl: './delete-dipendente-dialog.component.scss',
})
export class DeleteDipendenteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {personaId: number},
    private personaService: PersonaService,
    private dialog: MatDialog
  ) {}

  disabilitaDipendente(): void {
    this.personaService.disabilitaPersonaById(this.data.personaId).subscribe({
      next: (res) => {
        this.dialog.open(DeleteDipendenteResponseDialogComponent, {
          data: {successMessage: res.message},
          width: 'auto',
          height: 'auto',
        })
      },
      error: (err) => {
        this.dialog.open(DeleteDipendenteResponseDialogComponent, {
          data: {errorMessage: err?.error.message},
          width: 'auto',
          height: 'auto',
        })
      },
    })
  }
}
