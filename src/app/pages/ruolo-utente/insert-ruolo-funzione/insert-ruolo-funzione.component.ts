import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {AmministrazioneRuoloService} from '../../../service/amministrazione-ruolo.service'
import {ruoloFunzione} from '../../../dto/request/inserimentoNuovoRuolo'

@Component({
  selector: 'app-insert-ruolo-funzione',
  templateUrl: './insert-ruolo-funzione.component.html',
  styleUrl: './insert-ruolo-funzione.component.scss',
})
export class InsertRuoloFunzioneComponent implements OnInit {
  allFunzioni!: [{syapIdfunzione: number; syapDescrizione: string}]
  //funzioneVoceDiMenu!: { syapIdfunzione: number; syapDescrizione: string };
  //allFunzioniVociDiMenu!: [{ syapIdfunzione: number; syapDescrizione: string }];

  funzioneVoceDiMenu = {
    syapIdfunzione: 0,
    syapDescrizione: '',
  }

  allFunzioniVociDiMenu = [
    {
      syapIdfunzione: 0,
      syapDescrizione: '',
    },
  ]

  objectRuoloFunzione: ruoloFunzione = {
    syapIdfunzione: 0,
    syapDescrizione: '',
    flagLettura: false,
    flagVoceDiMenu: false,
    flagCreazione: false,
    flagModifica: false,
    flagCancellazione: false,
    ordinamento: 0,
    menuPadre: 0,
  }

  formData = {
    syapIdfunzione: 0,
    syapDescrizione: '',
    flagLettura: false,
    flagVoceDiMenu: false,
    flagCreazione: false,
    flagModifica: false,
    flagCancellazione: false,
    ordinamento: 0,
    menuPadre: 0,
  }

  arrayObjectRuoloFunzioni: ruoloFunzione[] = []
  arrayObjectRuoloFunzioniSliced: ruoloFunzione[] = []
  //arrayObjectRuoloFunzioni: any[] = [];

  ruolo: string = ''
  idFunzione: number = Number.parseInt('')
  idFunzioneStart: number = Number.parseInt('')
  descrizioneFunzione: string = ''

  constructor(
    private router: Router,
    private amministrazioneRuolo: AmministrazioneRuoloService
  ) {}

  ngOnInit(): void {
    this.getAllFunzioni()
    //this.idFunzione = 1;
    console.log(this.funzioneVoceDiMenu)
  }

  getAllFunzioni() {
    this.amministrazioneRuolo.getFunzioni().subscribe(
      (response: any) => {
        console.log(response)
        this.allFunzioni = response
        this.idFunzioneStart = this.allFunzioni[0].syapIdfunzione
        this.idFunzione = this.idFunzioneStart
      },
      (error: any) => {
        console.error('Errore durante il recupero delle funzioni:', error)
      }
    )
  }

  addFunzioneToRuolo() {
    if (!Number.isNaN(this.idFunzione)) {
      var index = 0
      for (let i = 0; i < this.allFunzioni.length; i++) {
        if (this.idFunzione == this.allFunzioni[i].syapIdfunzione) {
          this.descrizioneFunzione = this.allFunzioni[i].syapDescrizione
          index = i
          break
        }
      }

      this.allFunzioni.splice(index, 1)
      //console.log(sliced);
      this.arrayObjectRuoloFunzioni.push(this.creaNuovoRuoloFunzione())
      //this.arrayObjectRuoloFunzioniSliced.push(sliced);

      if (this.allFunzioni.length > 0) {
        this.idFunzione = this.allFunzioni[0].syapIdfunzione
      } else {
        this.idFunzione = Number.parseInt('')
      }
      console.log(this.allFunzioni)
    } else {
      // do nothing
    }
  }

  checkVoceDiMenu() {
    for (let i = 0; i < this.arrayObjectRuoloFunzioni.length; i++) {
      if (this.arrayObjectRuoloFunzioni[i].flagVoceDiMenu == true) {
        //console.log(this.arrayObjectRuoloFunzioni[i].syapIdfunzione, this.arrayObjectRuoloFunzioni[i].syapDescrizione, this.arrayObjectRuoloFunzioni[i].flagVoceDiMenu)
        this.funzioneVoceDiMenu.syapIdfunzione = this.arrayObjectRuoloFunzioni[i].syapIdfunzione
        this.funzioneVoceDiMenu.syapDescrizione = this.arrayObjectRuoloFunzioni[i].syapDescrizione
        //console.log(this.funzioneVoceDiMenu);
        //this.allFunzioniVociDiMenu.push(this.funzioneVoceDiMenu);
        //this.creaFunzioneVoceDiMenu(i);
        //console.log(this.allFunzioniVociDiMenu);
      }
    }
  }
  /*
  creaFunzioneVoceDiMenu(i: number) {
    return {
      this.funzioneVoceDiMenu.syapIdfunzione = this.arrayObjectRuoloFunzioni[i].syapIdfunzione,
      this.funzioneVoceDiMenu.syapDescrizione = this.arrayObjectRuoloFunzioni[i].syapDescrizione;
    }
  }
*/
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
      menuPadre: 0,
    }
  }

  deleteFunzione(element: any, index: number) {
    console.log('delete funzione START')
    //console.log(element);
    // rimuovo l'elemento da arrayObjectRuoloFunzioni
    this.arrayObjectRuoloFunzioni.splice(index, 1)
    // inserisco l'elemento sopra rimosso into allFunzioni
    this.allFunzioni.splice(0, 0, element)
    this.idFunzioneStart = this.allFunzioni[0].syapIdfunzione // ???
    console.log(this.allFunzioni)
    // sort dell'array allFunzioni
    this.allFunzioni.sort((a, b) => (a.syapDescrizione.toLocaleUpperCase() > b.syapDescrizione.toLocaleUpperCase() ? 1 : -1))
    console.log(this.allFunzioni)
    console.log('delete funzione END')
  }

  addRuolo() {
    console.log('aggiungi ruolo da implementare')
  }

  clearSearch() {
    this.ruolo = ''
    this.idFunzione = Number.parseInt('')
    //this.formData.funzione = "";
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa e i dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/gestione-ruolo-funzione'])
  }
}
