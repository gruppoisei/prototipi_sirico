import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UtilityCostiPersonaleService } from '../../service/utility-costi-personale.service';
import { MessageResponseDialogComponent } from '../../ui/message-response-dialog/message-response-dialog.component';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';

@Component({
  selector: 'app-utility-costi-personale',
  templateUrl: './utility-costi-personale.component.html',
  styleUrls: ['./utility-costi-personale.component.scss'],
})
export class UtilityCostiPersonaleComponent {
  selectedFiles: File[] = [];
  utenteLoggato: string = "frontend";

  constructor(
    private http: HttpClient,
    private serviceCostiPersonale: UtilityCostiPersonaleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const sysUser = sessionStorage.getItem('SysUser');
    if (sysUser) {
      this.utenteLoggato = sysUser;
    }
  }

  receiveFile($event: any): void {
    this.selectedFiles = $event;
  }

  salva(): void {
    if (this.selectedFiles.length > 0) {
      this.serviceCostiPersonale.uploadESalvaExcels(this.selectedFiles, this.utenteLoggato)
        .subscribe({
          next: (res) => {
            this.dialog.open(MessageResponseDialogComponent, {
              data: { successMessage: res.message },
              width: 'auto',
              height: 'auto'
            });
            this.selectedFiles = [];
          },
          error: (err) => {
            this.dialog.open(MessageResponseDialogComponent, {
              data: { errorMessage: err?.error.message },
              width: 'auto',
              height: 'auto'
            });
          }
        });
    } else {
      this.dialog.open(ResponseDialogComponent, {
        width: 'auto',
        height: 'auto',
      });
    }
  }
}
