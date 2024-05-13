import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { extExcel } from '../../enum/estenzioneFile';
import { UtilityCostiPersonaleService } from '../../service/utility-costi-personale.service';
import { MessageResponseDialogComponent } from '../../ui/message-response-dialog/message-response-dialog.component';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-utility-costi-personale',
  templateUrl: './utility-costi-personale.component.html',
  styleUrl: './utility-costi-personale.component.scss',
})

export class UtilityCostiPersonaleComponent {
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  enabled: boolean =  true;
  uploadValidation: boolean = true;
  utenteLoggato: string | null = null;

  constructor(private http: HttpClient, private serviceCostiPersonale: UtilityCostiPersonaleService, private dialog : MatDialog) {}

  ngOnInit(): void {
    this.utenteLoggato = sessionStorage.getItem('SysUser');
  }

  receiveFile($event : any){
    this.selectedFiles = $event;

    //controllo per estenzione
    //const existingFileIndex = this.selectedFiles.findIndex(file => file.name === this.selectedFile?.name);
    //TODO
    //if(this.selectedFiles.???)
  }

  salva(){
    if(this.uploadValidation == true)
      {
        //const listaFile = this.selectedFile;
        this.serviceCostiPersonale.uploadESalvaExcels(this.selectedFiles, this.utenteLoggato)
        .subscribe(
          {
            next:(res) =>
              {
                this.dialog.open(MessageResponseDialogComponent,
                  {
                    data: {successMessage : res.message},
                    width: 'auto',
                    height: 'auto'
                  })
                this.selectedFiles = []
              },
              error:(err) => 
              {
               this.dialog.open(MessageResponseDialogComponent,
                {
                  data: {errorMessage : err?.error.message},
                  width: 'auto',
                  height: 'auto'
                })
              }
          })
      }
      else
      {
        this.dialog.open(ResponseDialogComponent,
          {
            width: 'auto',
            height: 'auto',
          });
      }
  }


/*   stampa() {
    this.http.get<any>('URL_DELLA_TUA_API').subscribe((data) => {
      this.stampaLista(data);
    });
  }

  stampaLista(lista: any[]) {
    //TODO
    console.log(lista);
  } */

}
