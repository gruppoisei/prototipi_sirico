import { Component, OnInit, inject } from '@angular/core';
import { CommessaService } from '../../../service/commessa.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../../ui/message-response-dialog/message-response-dialog.component';
import ValidateForm from '../../../helpers/validateform';
import { ResponseDialogComponent } from '../../../ui/response-dialog/response-dialog/response-dialog.component';
@Component({
  selector: 'app-salva-commessa',
  templateUrl: './salva-commessa.component.html',
  styleUrl: './salva-commessa.component.scss'
})

export class SalvaCommessaComponent implements OnInit{

  data : string;
  commessaForm !: FormGroup
  isDisabled: boolean = true;
  formDefaultValue : any;
  minDataScadenza ?: string

  constructor(private commessaService : CommessaService, private location : Location, private formBuilder : FormBuilder, private dialog : MatDialog){
    const router = inject(Router)

    this.data = this.commessaService.getTiolo();
    if(this.data === ''){
      /*router.navigate(['/Segreteria/gestione-dipendente'])*/  
      }
  }

ngOnInit(): void {
    this.commessaForm = this.formBuilder.group({
      CommessaId : [0],
      DescCommessa : ['', Validators.required],
      DataInizio : ['', Validators.required],
      DataFine : [{value: '', disabled:true}],
      FlagAttivo : [{value: true, disabled: this.isDisabled}],
      /* SysUser : [this.authService.utente?.username] */
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
