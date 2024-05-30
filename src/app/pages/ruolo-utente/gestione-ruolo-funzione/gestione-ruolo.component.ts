import { Component, OnInit } from '@angular/core';
import { InsertUtenteService, PersoneEntity } from '../../../service/insert-utente.service';
import { Router } from '@angular/router';
import { AmministrazioneRuoloService } from '../../../service/amministrazione-ruolo.service';
import { InsertRuoloFunzioneComponent } from '../insert-ruolo-funzione/insert-ruolo-funzione.component';
import { MenuDinamicoService } from '../../../service/menu-dinamico.service';

@Component({
  selector: 'app-gestione-ruolo',
  templateUrl: './gestione-ruolo.component.html',
  styleUrls: ['./gestione-ruolo.component.scss']
})
export class GestioneRuoloComponent implements OnInit {

// EREDITARE
currentAlias: string = "";
finalPath: string = "";
componenteAssociato: any = "";
componenteMappato: any = "";

//listaComponenti = [{ idComponente: 12, component: ProvassComponent }]
//

  formData: any = { nome: '' };
  output_ricercaFiltrata: boolean = false;
  ruoli: any[] = [];


  constructor(private ruoliService: InsertUtenteService,
    private amministrazioneRuoli: AmministrazioneRuoloService,
    public menuDinamicoService: MenuDinamicoService,
    private router: Router) { }

  ngOnInit(): void {
    this.clearSearch();
    this.menuDinamicoService.loadComponentAssociato();
    this.menuDinamicoService.getPermissionFlag();
  }

  // async caricaComponenteAssociato() {

  //   console.log("this.router.url")
  //   console.log(this.router.url)

  //   this.currentAlias = this.router.url.replaceAll('%20',' ');

  //   console.log("this.currentAlias")
  //   console.log(this.currentAlias)
    
  //   var lastAlias = this.currentAlias.substring(this.currentAlias.lastIndexOf("/") + 1, this.currentAlias.length);

  //   // this.componenteAssociato = await this.amministrazioneRuoloService.getAliasComponenteAssociatoByPath(this.router.url.slice(1)).toPromise();
  //   this.componenteAssociato = await this.menuDinamico.getAliasComponenteAssociatoByPath(lastAlias).toPromise();
    
  //   console.log("this.componenteAssociato:");
  //   console.log(this.componenteAssociato);

  //   this.finalPath = this.currentAlias + '/' + this.componenteAssociato.pathDescrizione;
    
  //   console.log("this.finalPath");
  //   console.log(this.finalPath);    
  // }


  caricaRuoli() {
    this.ruoliService.GetRuoli(this.formData.nome).subscribe(
      (data: any[]) => {
        this.ruoli = data;
        this.output_ricercaFiltrata = true;
      },
      (error) => {
        console.log('Si è verificato un errore nel caricamento dei ruoli:', error);
      }
    );
  }

  clearSearch() {
    this.formData.nome = '';
    //this.output_ricercaFiltrata = false;
    this.ruoli = [];
  }

  ricercaFiltrata() {
    this.ruoliService.GetRuoli(this.formData.nome).subscribe(
      (data: any[]) => {
        if (data && Array.isArray(data)) {
          this.ruoli = data;
          this.output_ricercaFiltrata = true;
        } else {
          console.log('Risposta API non valida:', data);
        }
      },
      (error) => {
        console.log('Si è verificato un errore nel caricamento dei ruoli:', error);
      }
    );
  }
  
  deleteRuolo(id: number) {
    if (confirm('Sei sicuro di voler eliminare questo ruolo?')) {
      this.amministrazioneRuoli.eliminaRuolo(id).subscribe((res) => {
        console.log(res);        
        alert(res.message);
        if (res.message == 'Eliminazione avvenuta con successo!') {
          this.ruoli = this.ruoli.filter(ruolo => ruolo.syruIdruolosys !== id);
        this.output_ricercaFiltrata = this.ruoli.length > 0;
        }
      });
    }
  }

  modificaRuolo(id: number) {
    this.amministrazioneRuoli.ruoloId$.next(id);
    this.amministrazioneRuoli.ruoloId = id
    this.router.navigate(['/Segreteria/insert-ruolo-funzione']);
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?')) {
      this.router.navigate(['/Home']);
    }    
  }
}
