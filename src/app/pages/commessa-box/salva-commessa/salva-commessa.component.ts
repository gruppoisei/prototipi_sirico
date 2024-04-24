import { Component, OnInit, inject } from '@angular/core';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salva-commessa',
  templateUrl: './salva-commessa.component.html',
  styleUrl: './salva-commessa.component.scss'
})

export class SalvaCommessaComponent implements OnInit{

  data : string;
  commessaForm !: FormGroup
  

  constructor(private commessaService : CommessaService, private location : Location, private formBuilder : FormBuilder){
    const router = inject(Router)

    this.data = this.commessaService.getTiolo();
    if(this.data === ''){
      /*router.navigate(['/Segreteria/gestione-dipendente'])*/  
      }
  }

ngOnInit(): void {
    this.commessaForm = this.formBuilder.group({
      idCommessa : [0],
      DescComm : ['', Validators.required],
      dataInizio : ['', Validators.required],
      dataFine : [''],
      flagAttivo : [true, Validators.required]
    })
  }

goBack() : void {
  this.location.back();
}

clearSearch() {
throw new Error('Method not implemented.');
}

}
