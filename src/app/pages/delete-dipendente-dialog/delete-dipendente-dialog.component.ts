import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonaService } from '../../service/persona.service';

@Component({
  selector: 'app-delete-dipendente-dialog',
  templateUrl: './delete-dipendente-dialog.component.html',
  styleUrl: './delete-dipendente-dialog.component.scss'
})
export class DeleteDipendenteDialogComponent {
  
  constructor(@Inject (MAT_DIALOG_DATA) public data : {personaId: number}, private personaService: PersonaService){}

  disabilitaDipendente() : void
  {
    debugger
    this.personaService.disabilitaPersonaById(this.data.personaId).subscribe(
      {
        next:(res) =>
        {
          console.log(res.message)
        }
      })
  }

}
