import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommessaService } from '../../../service/commessa.service';
import { ErrorLoginDialogComponent } from '../../../ui/error-login-dialog/error-login-dialog.component';
import { ricercaCommessa } from '../../../dto/request/ricercaCommessa';
import FormattaData from '../../../helpers/formattaData';
import { DeleteCommessaDialogComponent } from '../../delete-commessa-dialog/delete-commessa-dialog.component';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestione-commessa',
  templateUrl: './gestione-commessa.component.html',
  styleUrl: './gestione-commessa.component.scss'
})
export class GestioneCommessaComponent implements OnInit{

  ricercaForm!: FormGroup;
  isDisabled: boolean = true;
  formDefaultValue : any;
  minDataScadenza ?: string
  constructor(private fb : FormBuilder, private commessaService : CommessaService,  private dialog : MatDialog, public menuDinamicoService: MenuDinamicoService, private router: Router){}
  datiCommessa: any[] = []
  idCommessa : number | null = null;

  ngOnInit(): void {
    this.ricercaForm = this.fb.group({
      CommessaId : [0],
      Commessa : ['', Validators.required],
      TipoCommessa : ['', Validators.required],
      Societa : ['', Validators.required],
      DataInizio : ['', Validators.required],
      DataFine : ['', Validators.required],
      FlagAttivo : [true],
    })
    this.formDefaultValue = this.ricercaForm.getRawValue()
    this.ricercaForm.get('DataInizio')?.valueChanges.subscribe(value => {
      if(value)
        {
          this.ricercaForm.get('DataFine')?.enable();
          const selectDate = new Date(value);
          this.minDataScadenza = selectDate.toISOString().split('T')[0]
        }
    });

    this.menuDinamicoService.loadComponentAssociato();
    this.menuDinamicoService.getPermissionFlag(); 
  }

  setTitoloModificaCommessa()
    {
      this.commessaService.setTitolo('Modifica commessa')
    }

  getCommessa(commessaId: number)
  {
    this.idCommessa = commessaId;
    this.commessaService.getCommessaById(this.idCommessa)
    this.router.navigate(['/'+this.menuDinamicoService.finalPath]);
  }

  setTitoloNuovaCommessa()
  {
    this.commessaService.setTitolo('Inserimento nuova commessa')
  }

    clearSearch()
  {
    this.ricercaForm.reset();
  }

  openDialogDelete(commessaId : number) {
    this.idCommessa = commessaId
    this.dialog.open(DeleteCommessaDialogComponent,
      {
        data: {commessaId: this.idCommessa},
        width: 'auto',
        height: 'auto'
      })
      .afterClosed().subscribe(() =>
        {
          this.ricercaFiltrata();
        })
    }

    ricercaFiltrata() {
      const queryParams : ricercaCommessa = this.ricercaForm.value;
  
      this.commessaService.getVistaCommessaFiltrata(queryParams)
    .subscribe(
      {
        next:(res) => 
        {
          console.log(res)
          this.datiCommessa = res.map((commessa : any)=>({
            commessaId: commessa.commessaId,
            commessa: commessa.commessa,
            tipoCommessa: commessa.tipoCommessa,
            societa: commessa.societa,
            clienteDiretto: commessa.clienteDiretto,
            clienteFinale: commessa.clienteFinale,
            dataInizio: FormattaData.formattaData(commessa.dataInizio),
            dataFine: FormattaData.formattaData(commessa.dataFine),
            note: commessa.note,
            flagAttivo: commessa.flagAttivo,
          }));
        },
        error:(err) =>
        {
          this.dialog.open(ErrorLoginDialogComponent,
            {
              data: {errorMessage : err?.error.message},
              width: 'auto',
              height: 'auto'
            });
        }
      });
    }

    mostraNotaCompleta(nota: string) {
      alert(nota); // Puoi sostituire questo con qualsiasi altra logica per mostrare il testo completo, come un modale
  }

  close() {
    this.router.navigate([""]);
  }

}
