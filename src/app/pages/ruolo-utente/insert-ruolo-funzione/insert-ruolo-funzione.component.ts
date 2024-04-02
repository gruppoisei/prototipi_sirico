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
  //funzioneVoceDiMenu!: { syapIdfunzione: number; syapDescrizione: string };
  //allFunzioniVociDiMenu!: [{ syapIdfunzione: number; syapDescrizione: string }];

  funzioneVoceDiMenu = {
    syapIdfunzione: 0,
    syapDescrizione: ""
  };

  allFunzioniVociDiMenu = [{
    syapIdfunzione: 0,
    syapDescrizione: ""
  }]

  objectRuoloFunzione: ruoloFunzione = {
    //nomeRuolo: "",
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
    //nomeRuolo: "",
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
  idFunzioneStart: number = Number.parseInt("");
  descrizioneFunzione: string = "";
  menuPadre: number = Number.parseInt("");;

  constructor(
    private router: Router,
    private amministrazioneRuolo: AmministrazioneRuoloService
  ) { }

  ngOnInit(): void {
    this.getAllFunzioni();
    //this.idFunzione = 1;        
    console.log(this.funzioneVoceDiMenu);

  }

  getAllFunzioni() {
    this.amministrazioneRuolo.getFunzioni().subscribe(
      (response: any) => {
        console.log(response);
        this.allFunzioni = response;
        this.idFunzioneStart = this.allFunzioni[0].syapIdfunzione;
        this.idFunzione = this.idFunzioneStart;
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
        if (this.idFunzione == this.allFunzioni[i].syapIdfunzione) {
          this.descrizioneFunzione = this.allFunzioni[i].syapDescrizione;
          index = i;
          break;
        }
      }

      this.allFunzioni.splice(index, 1);
      //console.log(sliced);
      this.arrayObjectRuoloFunzioni.push(this.creaNuovoRuoloFunzione());
      //this.arrayObjectRuoloFunzioniSliced.push(sliced);

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

  checkVoceDiMenu() {
    /*
    // preparo l'array vuoto che riempirò con le funzioni che hanno voce di menù flaggato
    this.allFunzioniVociDiMenu = [];
    // preparo il primo elemento nell'array come elemento vuoto
    // (caso funzione che: non è voce di menù && non è sottovoce perché è voce interna di un'altra pagina)
    this.allFunzioniVociDiMenu.push(this.creaFunzioneVoceDiMenu(0, "Nessuna"));
    */
    for (let i = 0; i < this.arrayObjectRuoloFunzioni.length; i++) {
      if (this.arrayObjectRuoloFunzioni[i].flagVoceDiMenu == true) {
        this.funzioneVoceDiMenu.syapIdfunzione = this.arrayObjectRuoloFunzioni[i].syapIdfunzione;
        this.funzioneVoceDiMenu.syapDescrizione = this.arrayObjectRuoloFunzioni[i].syapDescrizione;

        // this.allFunzioniVociDiMenu.push(this.creaFunzioneVoceDiMenu(i));
        this.allFunzioniVociDiMenu.push(
          this.creaFunzioneVoceDiMenu(
            this.arrayObjectRuoloFunzioni[i].syapIdfunzione, this.arrayObjectRuoloFunzioni[i].syapDescrizione)
        );
        // ordino l'array;
        this.allFunzioniVociDiMenu.sort((a, b) => a.syapDescrizione.toLocaleUpperCase() > b.syapDescrizione.toLocaleUpperCase() ? 1 : -1);
        // preparo l'array vuoto che riempirò con le funzioni che hanno voce di menù flaggato
        this.allFunzioniVociDiMenu = [];
        // preparo il primo elemento nell'array come elemento vuoto
        // (caso funzione che: non è voce di menù && non è sottovoce perché è voce interna di un'altra pagina)
        // da testare: se non funziona cancellare qui e scommentare sopra
        this.allFunzioniVociDiMenu.push(this.creaFunzioneVoceDiMenu(0, "Nessuna"));
        console.log(this.allFunzioniVociDiMenu);
      }
    }
  }

  creaFunzioneVoceDiMenu(id: number, description: string) {
    return {
      syapIdfunzione: id,
      syapDescrizione: description
    }
  }

  creaNuovoRuoloFunzione(): ruoloFunzione {
    return {
      //nomeRuolo: "",
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

  deleteFunzione(element: any, index: number) {
    console.log('delete funzione START');
    // rimuovo l'elemento da arrayObjectRuoloFunzioni
    var splicedId = this.arrayObjectRuoloFunzioni[index].syapIdfunzione
    this.arrayObjectRuoloFunzioni.splice(index, 1);
    // verifico se l'elemento era presente in "menù padre" e se presente lo rimuovo
    for (let i = 0; i < this.allFunzioniVociDiMenu.length; i++) {
      if (this.allFunzioniVociDiMenu[i].syapIdfunzione == splicedId) {
        this.allFunzioniVociDiMenu.splice(i, 1);
        break;
      }
    }
    // inserisco l'elemento sopra rimosso into allFunzioni
    this.allFunzioni.splice(0, 0, element);
    this.idFunzioneStart = this.allFunzioni[0].syapIdfunzione;  // ???
    console.log(this.allFunzioni);
    // sort dell'array allFunzioni
    this.allFunzioni.sort((a, b) => a.syapDescrizione.toLocaleUpperCase() > b.syapDescrizione.toLocaleUpperCase() ? 1 : -1);
    console.log(this.allFunzioni);
    console.log('delete funzione END');
  }

  addRuolo() {
    console.log('addRuolo() START');
    console.log('NOME RUOLO:');
    console.log(this.ruolo);
    console.log('FUNZIONI ASSOCIATE:');
    console.log(this.arrayObjectRuoloFunzioni);
    // codice da testare
    // fill del campo nomeRuolo con ruolo per ogni oggetto dell'array
    /*
      for(let i=0; i<this.arrayObjectRuoloFunzioni; i++) {
        this.arrayObjectRuoloFunzioni[i].nomeRuolo = this.ruolo;
      }
    */
/*
    this.amministrazioneRuolo.insertNuovoRuolo(this.arrayObjectRuoloFunzioni).subscribe(
      (response: any) => {
        console.log(response);
        alert(response);
        //this.clearForm();
      },
      (error: any) => {
        console.error("Errore durante l'inserimento del nuovo contratto:", error);
        alert("Errore durante l'inserimento del nuovo contratto");
      }
    );
*/
    console.log('addRuolo() END');
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



