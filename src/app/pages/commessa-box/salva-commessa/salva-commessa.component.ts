import { Component, OnInit, inject } from '@angular/core';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
import { AuthenticationService } from '../../../service/authentication.service';
import { SocietaService } from '../../../service/societa.service';
@Component({
  selector: 'app-salva-commessa',
  templateUrl: './salva-commessa.component.html',
  styleUrl: './salva-commessa.component.scss'
})

export class SalvaCommessaComponent implements OnInit{

  titolo : string;
  commessaForm !: FormGroup
  isDisabled: boolean = true;
  formDefaultValue : any;
  minDataScadenza ?: string
  utenteLoggato : string | null = ""
  listSocieta: any
  listTipoCommisione : any;
  listClienti : any
  listTipoCommessa: any;

  constructor(
    private authSevice: AuthenticationService, private commessaService : CommessaService,
    private location : Location, private formBuilder : FormBuilder,
    private dialog : MatDialog, private societaService : SocietaService){
    const router = inject(Router)

    this.titolo = this.commessaService.getTiolo();
    if(this.titolo === ''){
      /*router.navigate(['/Segreteria/gestione-dipendente'])*/  
      }
  }

ngOnInit(): void {
    this.authSevice.utenteLoggato$.subscribe((utenteLoggato) =>
      {
        this.utenteLoggato = utenteLoggato;
      })
      this.societaService.getAllSocieta().subscribe(societa => this.listSocieta = societa);
      this.commessaService.getAllTipoCommesse().subscribe(tipoCommessa => this.listTipoCommessa = tipoCommessa)
    this.commessaForm = this.formBuilder.group({
      CommessaId : [0],
      DescCommessa : ['', Validators.required],
      idTipoCommessa : ['', Validators.required],
      idSocieta : ['', Validators.required],
      idClienteDiretto : [''],
      idClienteFinale : [''],
      DataInizio : ['', Validators.required],
      DataFine : [{value: '', disabled:true}],
      note : [''],
      FlagAttivo : [{value: true}],
      SysUser : [this.utenteLoggato]
    })
    this.formDefaultValue = this.commessaForm.getRawValue()
    this.commessaForm.get('DataInizio')?.valueChanges.subscribe(value => {
      if(value)
        {
          this.commessaForm.get('DataFine')?.enable();
          const selectDate = new Date(value);
          this.minDataScadenza = selectDate.toISOString().split('T')[0]
        }
        else
        {
          this.commessaForm.get('DataFine')?.disable();
        }
    });
  }

  salvaCommessa()
  {
   if(this.commessaForm.valid)
    {
      this.commessaService.salvaCommessa(this.commessaForm.getRawValue()).subscribe(
        {
          next:(res)=>
            {
              this.dialog.open(MessageResponseDialogComponent,
                {
                  data :{successMessage : res.message},
                  width : 'auto',
                  height : 'auto'
                });
                this.clearSearch()
            },
            error:(err) =>
              {
                this.dialog.open(MessageResponseDialogComponent,
                  {
                    data : {errorMessage : err?.error.message},
                    width : 'auto',
                    height : 'auto'
                  });
              }
        });
    }
    else
    {
      ValidateForm.validateAllFormFields(this.commessaForm);
      this.dialog.open(ResponseDialogComponent,
        {
          width : 'auto',
          height : 'auto'
        });
    } 
  }

goBack() : void {
  this.location.back();
}

clearSearch() {
  this.commessaForm.reset(this.formDefaultValue)
}

}
