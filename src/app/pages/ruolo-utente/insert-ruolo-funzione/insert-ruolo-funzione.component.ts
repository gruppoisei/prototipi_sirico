import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { ruoloFunzione } from '../../../dto/request/inserimentoNuovoRuolo';


@Component({
  selector: 'app-insert-ruolo-funzione',
  templateUrl: './insert-ruolo-funzione.component.html',
  styleUrl: './insert-ruolo-funzione.component.scss'
})
export class InsertRuoloFunzioneComponent implements OnInit {

  allFunzioni!: [{ syapIdfunzione: number; syapDescrizione: string }];
  allFunzioniCopia!: [{ syapIdfunzione: number; syapDescrizione: string }];

  objectRuoloFunzione: ruoloFunzione = {
    syapIdfunzione: 0,
    syapDescrizione: "",
    flagLettura: false,
    flagVoceDiMenu: false,
    flagCreazione: false,
    flagModifica: false,
    flagCancellazione: false,
    ordinamento: 0,
    menuPadre: 0
  }

  formData = {
    syapIdfunzione: 0,
    syapDescrizione: "",
    flagLettura: false,
    flagVoceDiMenu: false,
    flagCreazione: false,
    flagModifica: false,
    flagCancellazione: false,
    ordinamento: 0,
    menuPadre: 0
  }

  arrayObjectRuoloFunzioni: ruoloFunzione[] = [];
  //arrayObjectRuoloFunzioni: any[] = [];  

  ruolo: string = "";
  idFunzione: number = Number.parseInt("");
  descrizioneFunzione: string = "";

  constructor(
    private router: Router,
    private amministrazioneRuolo: AmministrazioneRuoloService
  ) { }

  ngOnInit(): void {
    this.getAllFunzioni();
    this.idFunzione = 1;
    //this.objectRuoloFunzione;    
  }

  getAllFunzioni() {
    this.amministrazioneRuolo.getFunzioni().subscribe(
      (response: any) => {
        console.log(response);
        this.allFunzioni = response;
        this.allFunzioniCopia = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero delle funzioni:', error);
      }
    );
  }

  addFunzioneToRuolo() {
    if (!Number.isNaN(this.idFunzione)) {
      var index = 0;
      for (let i = 0; i < this.allFunzioni.length; i++) {
        console.log(i);
        if (this.idFunzione == this.allFunzioni[i].syapIdfunzione) {
          this.descrizioneFunzione = this.allFunzioni[i].syapDescrizione;
          index = i;
          break;
        }
      }

      this.allFunzioni.splice(index, 1);
      this.arrayObjectRuoloFunzioni.push(this.creaNuovoRuoloFunzione());

      if (this.allFunzioni.length > 0) {
        this.idFunzione = this.allFunzioni[0].syapIdfunzione;
      }
      else {
        this.idFunzione = Number.parseInt("");
      }
      console.log(this.allFunzioni);
    }
    else {
      // do nothing
    }

  }

  creaNuovoRuoloFunzione(): ruoloFunzione {
    return {
      syapIdfunzione: this.idFunzione,
      syapDescrizione: this.descrizioneFunzione,
      flagLettura: false,
      flagVoceDiMenu: false,
      flagCreazione: false,
      flagModifica: false,
      flagCancellazione: false,
      ordinamento: this.arrayObjectRuoloFunzioni.length,
      menuPadre: 0
    };
  }

  deleteFunzione() {
    console.log('delete funzione da implementare');
  }

  addRuolo() {
    console.log('aggiungi ruolo da implementare');
  }

  clearSearch() {
    this.ruolo = "";
    this.idFunzione = Number.parseInt("");
    //this.formData.funzione = "";
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa e i dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/gestione-ruolo-funzione']);
  }
}



