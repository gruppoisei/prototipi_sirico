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
  nomePersona?: string | null;
  cognomePersona?: string | null;

  constructor(
    private inserimentoContrattoService: InsertContrattoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openCronologiaDistaccoModal();
    this.nomePersona = this.inserimentoContrattoService.nomePersonaCronologiaDistacchi;
    this.cognomePersona = this.inserimentoContrattoService.cognomePersonaCronologiaDistacchi;
  }

  openCronologiaDistaccoModal() {    
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

