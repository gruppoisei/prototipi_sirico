import { Component, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsertContrattoService } from '../../service/insert-contratto.service';
import { InsertUtenteService } from '../../service/insert-utente.service';

@Component({
  selector: 'app-dialog-cerca-persona',
  templateUrl: './dialog-cerca-persona.component.html',
  styleUrl: './dialog-cerca-persona.component.scss'
})
export class DialogCercaPersonaComponent {

  formDataDialog: any = {
    personaid: null,
    nome: null,
    cognome: null,
    codiceFiscale: null,
  };

  filtroRicerca: any = { nome: null, cognome: null, codiceFiscale: null };
  listaPersone: any[] = [];
  output_ricercaFiltrata: boolean;
  tipo?: string | null;

  // DIALOG
  //@ViewChild('approvalModal') approvalModal!: TemplateRef<any>;

  constructor(
    //private activeRoute: ActivatedRoute,
    //private router: Router,
    private inserimentoContrattoService: InsertContrattoService,
    private utenteService: InsertUtenteService,
    private dialog: MatDialog,
    //private builder: FormBuilder
  ) {
    this.output_ricercaFiltrata = false;

    if (this.inserimentoContrattoService.modalType != undefined) {
      this.tipo = this.inserimentoContrattoService.modalType;
    }
    else if (this.utenteService.modalType != undefined) {
      this.tipo = this.utenteService.modalType;
    }

  }

  //ricercaFiltrata(name: string, surname: string, cf: string) {
  ricercaFiltrata(tipoRicerca?: string | null) {

    this.tipo = tipoRicerca;  // preparo il tipo per lo switch in ricercaFiltrata e in autoFillFields

    switch (this.tipo) {

      case "contratto": {
        this.inserimentoContrattoService
          .getAllDipendentiSenzaContratto(this.formDataDialog.nome, this.formDataDialog.cognome, this.formDataDialog.codiceFiscale)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.listaPersone = response;
              this.output_ricercaFiltrata = true;
            },
            (error: any) => {
              console.error(
                'Errore durante il recupero della lista dei dipendenti senza contratto:',
                error
              );
            }
          );
      }
        break;

      case "utenza": {
        this.filtroRicerca.nome = this.formDataDialog.nome;
        this.filtroRicerca.cognome = this.formDataDialog.cognome;
        this.filtroRicerca.codiceFiscale = this.formDataDialog.codiceFiscale;
        this.utenteService.GetAllPersoneSenzaUtenza(this.filtroRicerca)
          .subscribe(
            (response: any) => {
              console.log(response);
              this.listaPersone = response;
              this.output_ricercaFiltrata = true;
            },
            (error: any) => {
              console.error(
                'Errore durante il recupero dei tipi di contratto:',
                error
              );
            }
          );
      }
        break;
    }
  }

  autoFillFields(persona: any) {

    switch (this.tipo) {

      case "contratto": {
        this.inserimentoContrattoService.fieldAutoFill$.next({
          id: persona.anpePersonaid,
          nome: persona.anpeNome,
          cognome: persona.anpeCognome,
          codiceFiscale: persona.anpeCodicefiscale
        });
        this.closeModal();
      }
        break;

      case "utenza": {
        this.utenteService.fieldAutoFill$.next({
          id: persona.anpePersonaid,
          nome: persona.anpeNome,
          cognome: persona.anpeCognome,
          codiceFiscale: persona.anpeCodicefiscale
        });
        this.closeModal();
      }
        break;
    }
  }

  clearSearch() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.formDataDialog = {
        nome: null,
        cognome: null,
        codiceFiscale: null,
        partitaIva: null
      };
    } else {
      console.log('Operazione annullata');
    }
  }

  closeModal(): void {
    this.dialog.closeAll();
  }

}
