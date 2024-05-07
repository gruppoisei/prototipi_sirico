import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DocumentiService } from '../../service/documenti.service';
import { MatDialog } from '@angular/material/dialog';
import { ErroreAllegatoDialogComponent } from '../../ui/errore-allegato-dialog/errore-allegato-dialog.component';
import { PersonaService } from '../../service/persona.service';
import { CommessaService } from '../../service/commessa.service';

@Component({
  selector: 'app-gestione-file',
  templateUrl: './gestione-file.component.html',
  styleUrl: './gestione-file.component.scss'
})
export class GestioneFileComponent implements OnInit{
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  isTableVisibile : boolean = false
  @ViewChild('fileUploader') fileUploader!: ElementRef

  constructor(private personaService : PersonaService, private serviceDocumenti: DocumentiService, private dialog : MatDialog){}
  ngOnInit(): void {
    this.personaService.dipendente$.subscribe((dipendente)=>{
        if(dipendente){
            this.serviceDocumenti.GetFilesByDipendenteId(dipendente.anpePersonaid).subscribe({
                next : (response)=>{
                  console.log(response)
                    if(response.length > 0){
                        this.selectedFiles = [];
                        response.forEach((fileData:any)=>{
                          const blob = new Blob([fileData.bytes], {type: "application/octet-stream"});
                          const file = new File([blob], fileData.fileName, {type: "application/octet-stream"});
                          this.selectedFiles.push(file)
                          console.log(this.selectedFiles)

                          this.isTableVisibile = true
                        });
                      }
                  }
              });
          }
      });
  }

  @Output() fileEvent = new EventEmitter();

  sendFile()
  {
    this.fileEvent.emit(this.selectedFiles)
  }

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
