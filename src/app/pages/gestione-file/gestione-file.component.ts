import { Component, ElementRef, ViewChild } from '@angular/core';
import { DocumentiService } from '../../service/documenti.service';
import { MatDialog } from '@angular/material/dialog';
import { ErroreAllegatoDialogComponent } from '../../ui/errore-allegato-dialog/errore-allegato-dialog.component';

@Component({
  selector: 'app-gestione-file',
  templateUrl: './gestione-file.component.html',
  styleUrl: './gestione-file.component.scss'
})
export class GestioneFileComponent {
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  isTableVisibile : boolean = false
  @ViewChild('fileUploader') fileUploader!: ElementRef

  constructor(private serviceDocumenti: DocumentiService, private dialog : MatDialog){}

  addFile()
  {
    if(this.selectedFile)
    {
      this.serviceDocumenti.verificaAllegato(this.selectedFile).subscribe(
        {
          next: (res) => 
          {
            if(res) 
            {
              const existingFileIndex = this.selectedFiles.findIndex(file => file.name === this.selectedFile?.name);
              if(existingFileIndex === -1)
              {
                this.selectedFiles.push(this.selectedFile!);
                this.selectedFile = null;
                this.fileUploader.nativeElement.value= "";
                this.isTableVisibile = true;
              }
              else{
                alert('Il file selezionato è giá stato inserito!')
              }
            }
          },
          error : (err) =>
            {
              this.dialog.open(ErroreAllegatoDialogComponent,
                {
                  data: {errorMessage : err?.error.message},
                  width: 'auto',
                  height: 'auto'
                });
                this.fileUploader.nativeElement.value= "";
            }          
        })
    }
    else
    {
      alert('Nessun file selezionato!')
    }
  }

    onFileSelected(event: any) 
    {
      this.selectedFile = event.target.files[0];
    }

    getFileSize(size : number)
    {
      const fileSizeinBytes = size;
      const fileSizeinKb = fileSizeinBytes / 1024
      return fileSizeinKb.toFixed(0) + 'KB';
    }

    removeFile(file : File)
    {
      const index = this.selectedFiles.indexOf(file);
      if(index != -1)
      {
        this.selectedFiles.splice(index, 1);
      }
      if(this.selectedFiles.length === 0)
      {
        this.isTableVisibile = false;
      }
    }

    downloadFile(file : File)
    {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');

      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

}
