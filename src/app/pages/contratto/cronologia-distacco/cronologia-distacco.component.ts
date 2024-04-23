import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InsertContrattoService } from '../../../service/insert-contratto.service';

@Component({
  selector: 'app-cronologia-distacco',
  templateUrl: './cronologia-distacco.component.html',
  styleUrl: './cronologia-distacco.component.scss'
})
export class CronologiaDistaccoComponent implements OnInit {

  listaDistacchi: any[] = [];

  constructor(
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openCronologiaDistaccoModal();
  }

  openCronologiaDistaccoModal() {
    //1
    /*
    this.inserimentoContrattoService.idPersonaCronologiaDistacchi =
      this.formData.Personaid;
    //FORSE CAMBIARE COSì: PASSA IDPERSONA AL SERVICE, POI QUESTA CHIAMATA LA FA L'ALTRO COMPONENTE (CronologiaDistaccoComponent)
    if (this.inserimentoContrattoService.idPersonaCronologiaDistacchi != null) {
      this.inserimentoContrattoService.getCronologiaDistacco().subscribe(
        (response) => {
          console.log('Risposta dalla chiamata GET:', response);
          //APRI MODAL DIALOG
          const dialogRef = this.dialog.open(CronologiaDistaccoComponent, {
            width: '50%',
            height: '80%',
          });
        },
        (error) => {
          console.error('Errore durante la chiamata GET:', error);
        }
      );
    }
    */

    //2
    this.inserimentoContrattoService.getCronologiaDistacco().subscribe(
      (response: any) => {
        console.log(response);
        if (response == null) { }
        else {
          this.listaDistacchi = response;
          this.listaDistacchi.sort((a, b) => a.codsDatafinedistacco < b.codsDatafinedistacco ? 1 : -1);
        }
      },
      (error: any) => {
        console.error('Errore durante il recupero della cronologia distacchi:', error);
      }
    );
  }

  closeModal() {
    this.dialog.closeAll();
  }

}

