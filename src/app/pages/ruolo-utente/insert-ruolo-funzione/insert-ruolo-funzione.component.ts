import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-insert-ruolo-funzione',
  templateUrl: './insert-ruolo-funzione.component.html',
  styleUrl: './insert-ruolo-funzione.component.scss'
})
export class InsertRuoloFunzioneComponent {


  formData = {
    ruoli: "",
    funzioni: "",
    funzione: ""
  }

  constructor(
    private router: Router
  ) { }

  ricercaFiltrata() {
    console.log('Method not implemented. formData:');
    if (this.formData.funzione != "" && this.formData.funzione != undefined && this.formData.funzione != null) {
      console.log('Ruoli e FUNZIONE:');
      console.log(this.formData.ruoli);
      console.log(this.formData.funzione);
    }
    else {
      console.log('Ruoli e FUNZIONI:');
      console.log(this.formData.ruoli);
      console.log(this.formData.funzioni);
    }    
  }

  clearSearch() {
    this.formData.ruoli = "";
    this.formData.funzioni = "";
    this.formData.funzione = "";
  }

  closeForm() {
    if (confirm('La pagina verrà chiusa e i dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/gestione-ruolo-funzione']);
  }
}
