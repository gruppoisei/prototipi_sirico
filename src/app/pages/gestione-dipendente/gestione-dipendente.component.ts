import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ricercaDipendente } from '../../dto/request/ricercaDipendente';
import { PersonaService } from '../../service/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorLoginDialogComponent } from '../../ui/error-login-dialog/error-login-dialog.component';


@Component({
  selector: 'app-gestione-dipendente',
  templateUrl: './gestione-dipendente.component.html',
  styleUrl: './gestione-dipendente.component.scss'
})

export class GestioneDipendenteComponent implements OnInit{

  ricercaForm!: FormGroup;
  constructor(private fb : FormBuilder, private personaService : PersonaService, private dialog : MatDialog){}
  datiPersona: any[] = []
  
  ngOnInit(): void {
    this.ricercaForm = this.fb.group({
      AnpeNome: [''],
      AnpeCognome: [''],
      AnpeCodicefiscale: [''],
      GecoDeno: [''],
      AnpeEmailaziendale: [''],
      AnsoRagionesociale: ['']
  })
   }

  clearSearch()
  {
    this.ricercaForm.reset();
  }
      
  ricercaFiltrata()
  {
    const queryParams : ricercaDipendente = this.ricercaForm.value;

    this.personaService.getVistaPersoneFiltrata(queryParams)
    .subscribe(
      {
        next:(res) => 
        {
          this.datiPersona = res.map((persona : any)=>({
            AnpeNome:persona.anpeNome,
            AnpeCognome: persona.anpeCognome,
            AnpeCodicefiscale: persona.anpeCodicefiscale,
            GecoDeno: persona.gecoDeno,
            AnpeEmailaziendale: persona.anpeEmailaziendale,
            AnsoRagionesociale: persona.ansoRagionesociale,
          }))
        },
        error:(err) =>
        {
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width: 'auto',
              height: 'auto'
            })
        }
      })
  }

}
