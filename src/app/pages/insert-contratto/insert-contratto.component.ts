import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contratto } from '../../dto/request/contratto';
import { InsertContrattoService } from '../../service/insert-contratto.service';

@Component({
  selector: 'app-insert-contratto',
  templateUrl: './insert-contratto.component.html',
  styleUrl: './insert-contratto.component.scss'
})

export class InsertContrattoComponent implements OnInit {
/*
  myGroup = new FormGroup({
    firstName: new FormControl()
});
 */ 

submitForm() {
  console.log(this.formData);
}

  checkbox: any;
  uncheck: any;

  contratto: Contratto[] = [];
  tipiSocieta: [{ ansoSocietaid: number; ansoRagionesociale: string }] | undefined;
  tipiContratto: [{ cotcTipocontrattoid: number; cotcContratto: string }] | undefined;
  tipiCcnl: [{ coccCcnlid: number; coccDesc: string }] | undefined;
  tipiLivello: [{ coliLivelloid: number; coliLivellocontratto: string }] | undefined;
  tipiRuolo: [{ anruRuoloid: number; anruRuolodesc: string }] | undefined;
  

  formData: Contratto = {
    AnpeNome: null,
    AnpeCognome: null,
    AnsoSocietaid: null,
    CodiDatainiziocontratto: null,
    CodiDatafinecontratto: null,
    CotcTipocontrattoid: null,
    CoccCcnlid: 0,
    ColiLivelloid: null,
    AnruRuoloid: null,
    CodiRalcompenso: null,
    costopresuntoannuo: null,
    costopresuntogiorno: null,
    CodsValoredistacco: null,
    CodsDatainiziodistacco: null,
    CodsDatafinedistacco: null,
    CodiNote: null
  };

  constructor(private fb: FormBuilder, private router: Router, private inserimentoContrattoService: InsertContrattoService) {
    
  }

  ngOnInit(): void {
    this.reset();
    this.getAllTipoSocieta();
    this.getAllTipoContratto();
    this.getAllTipoCcnl();
    //this.getAllTipoLivello(); 
    this.getAllTipoRuolo();     
  }


 check(uncheck: any) {
   if (uncheck == null) { this.uncheck = true; }
   else if (uncheck == true ) { this.uncheck = false; }
   }

  clearForm() {
    if (confirm('I campi verranno resettati. Si desidera procedere?')) {
      this.reset();
    }
    else {
      console.log('Operazione annullata');
    }
    //console.log("JASDAD    " + this.formData.CotcTipocontrattoid);
  }

  reset() {
    this.formData = {
      AnpeNome: null,
      AnpeCognome: null,
      AnsoSocietaid: null,
      CodiDatainiziocontratto: null,
      CodiDatafinecontratto: null,
      CotcTipocontrattoid: null,
      CoccCcnlid: 0,
      ColiLivelloid: null,
      AnruRuoloid: null,
      CodiRalcompenso: null,
      costopresuntoannuo: null,
      costopresuntogiorno: null,
      CodsValoredistacco: null,
      CodsDatainiziodistacco: null,
      CodsDatafinedistacco: null,
      CodiNote: null
    };
    this.uncheck = false;
  }


  closeForm() {
    if (confirm('La pagina verrà chiusa, qualora ci sono dati inseriti verranno cancellati. Si desidera procedere?'))
      this.router.navigate(['/homepage']);
  }

  getAllTipoSocieta() {
    this.inserimentoContrattoService.getAllTipoSocieta().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiSocieta = response;
        },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  getAllTipoContratto() {
    this.inserimentoContrattoService.getAllTipoContratto().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiContratto = response;
        },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di contratto:', error);
      }
    );
  }

  getAllTipoCcnl() {
    this.inserimentoContrattoService.getAllTipoCcnl().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiCcnl = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllTipoLivello() {
    this.inserimentoContrattoService.getAllTipoLivello(this.formData.CoccCcnlid).subscribe(
      (response: any) => {
        console.log(response);
        this.tipiLivello = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  getAllTipoRuolo() {
    this.inserimentoContrattoService.getAllTipoRuolo().subscribe(
      (response: any) => {
        console.log(response);
        this.tipiRuolo = response;
      },
      (error: any) => {
        console.error('Errore durante il recupero dei tipi di ccnl:', error);
      }
    );
  }

  
  

  insertContratto() {

  }

  


}
