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

  objectRuoloFunzione!: ruoloFunzione;  
  arrayObjectRuoloFunzioni: ruoloFunzione[] = [];  

  ruolo: string = "";
  idFunzione: number = Number.parseInt("");

  constructor(
    private router: Router,
    private amministrazioneRuolo: AmministrazioneRuoloService
  ) { }

  ngOnInit(): void {
    this.getAllFunzioni();
    //this.objectRuoloFunzione;    
  }

  getAllFunzioni() {
    this.amministrazioneRuolo.getFunzioni().subscribe(
      (response: any) => {
        console.log(response);
        this.allFunzioni = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero delle funzioni:', error);
      }
    );
  }

  addFunzioneToRuolo() {
    console.log('Ruoli e FUNZIONI:');
    console.log(this.ruolo);
    console.log(this.idFunzione);
    //this.objectRuoloFunzione.syapIdfunzione = this.idFunzione !== null ? this.idFunzione : undefined;

    this.objectRuoloFunzione.syapIdfunzione = this.idFunzione;        
    this.objectRuoloFunzione.flagLettura = false;
    this.objectRuoloFunzione.flagVoceDiMenu = false;
    this.objectRuoloFunzione.flagCreazione = false;
    this.objectRuoloFunzione.flagModifica = false;
    this.objectRuoloFunzione.flagCancellazione = false;
    this.objectRuoloFunzione.ordinamento = 0;
    this.objectRuoloFunzione.menuPadre = 0;
     
    //console.log(this.objectRuoloFunzione);
    
    this.arrayObjectRuoloFunzioni.push(this.objectRuoloFunzione);
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



