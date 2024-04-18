import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegioneService } from '../../service/regione.service';
import { PaesiService } from '../../service/paesi.service';
import { SocietaService } from '../../service/societa.service';
import { ProvinceService } from '../../service/province.service';
import { ComuniService } from '../../service/comuni.service';
import {Location} from '@angular/common';
import ValidateForm from '../../helpers/validateform';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../ui/message-response-dialog/message-response-dialog.component';
import { PersonaService } from '../../service/persona.service';
import { DocumentiService } from '../../service/documenti.service';
import FormattaData from '../../helpers/formattaData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert-persona',
  templateUrl: './insert-persona.component.html',
  styleUrl: './insert-persona.component.scss'
})
export class InsertPersonaComponent implements OnInit{

  oggi = new Date()   
  minVisita : string
  maxVisita : string
  maxDateScadenza ?: string
  insertPersona !: FormGroup;
  listRegioni: any;
  listRegioniResidenza : any
  listRegioniDomicilio : any
  listPaese: any;
  listSocieta: any;
  listProvince: any;
  listProvinceResidenza: any;
  listProvinceDomicilio: any;
  listComuniNascita: any;
  listComuniResidenza: any;
  listComuniDomicilio: any;
  showDomicilio: any;
  data : string;
  idProvinciaNascita : any;
  idRegioneNascita : any;
  idProvinciaResidenza: any;
  idRegioneResidenza: any;
  idProvinciaDomicilio: any;
  idRegioneDomicilio: any;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  isTableVisibile : boolean = false

constructor
(
  private personaService : PersonaService, private dialog: MatDialog,
  private location: Location, private fb : FormBuilder,
  private serviceRegione: RegioneService, private servicePaese: PaesiService,
  private serviceSocieta:SocietaService,private serviceProvince: ProvinceService,
  private serviceComune:ComuniService, private serviceDocumenti: DocumentiService
)

{
  const router = inject(Router)

  this.data = this.personaService.getTiolo();
  if(this.data === '')
    {
      router.navigate(['/Segreteria/gestione-dipendente'])
    }
  this.minVisita = new Date(this.oggi.getFullYear()-3,0,2).toISOString().split('T')[0];
  this.maxVisita = new Date(this.oggi.getFullYear(),this.oggi.getMonth(),this.oggi.getDate()+2).toISOString().split('T')[0]
}

  ngOnDestroy()
  {
    this.personaService.clearDipendente();
  }

  ngOnInit(): void 
  {
    this.insertPersona = this.fb.group(
      {
        AnpePersonaid: [0],
        AnpeNome: ['', Validators.required],
        AnpeCognome: ['', Validators.required],
        AnpeDatanascita: ['', Validators.required],
        AnpeCodicefiscale: ['', [Validators.required, Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$')]],
        AnpePartitaiva: ['', [Validators.pattern('^(IT)?[0-9]{11}$')]],
        AnpeFkGepaPaeseidPaesenascita: ['', Validators.required],
        RegioneNascita: ['',Validators.required],
        ProvinciaNascita: ['',Validators.required],
        AnpeFkGecoComuneidComunenascita: ['', Validators.required],
        AnpeFkGepaPaeseidPaeseresidenza: ['', Validators.required],
        RegioneResidenza: ['', Validators.required],
        ProvinciaResidenza: ['', Validators.required],
        AnpeFkGecoComuneidComuneresidenza: ['', Validators.required],
        AnpeIndirizzoresidenza:['', Validators.required],
        AnpeNumerocivicoresidenza: ['', Validators.required],
        AnpeCapresidenza: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        AnpeFkGepaPaeseidPaesedomicilio: [''],
        AnpeFkGecoComuneidComunedomicilio: [''],
        RegioneDomicilio: [''],
        ProvinciaDomicilio: [''],
        AnpeIndirizzodomicilio: [''],
        AnpeNumerocivicodomicilio: [''],
        AnpeCapdomicilio: ['',Validators.pattern('^[0-9]{5}$')],
        AnpeNtelefono1: ['', [Validators.required, Validators.pattern('^((00|\\+)?39)?(3)\\d{8,9}$')]],
        AnpeNtelefono2: ['', Validators.pattern('^((00|\\+)?39)?(3)\\d{8,9}$')],
        AnpeDataidoneitamedica : [''],
        AnpeDatascadenzaidoneitamedica : [{value: '', disabled : true}],
        AnpeEmailaziendale: ['', [Validators.required, Validators.email]],
        AnpeEmailpersonale: ['', Validators.email],
        AnpeFkAnsoSocietaid: ['', Validators.required],
      })

      this.insertPersona.get('AnpeDataidoneitamedica')?.valueChanges.subscribe(value => {
        if (value) {
          this.insertPersona.get('AnpeDatascadenzaidoneitamedica')?.enable();
          const selectDate = new Date(value);
          const maxDate = new Date(selectDate.getFullYear() + 3, selectDate.getMonth(), selectDate.getDate()+1);
          this.maxDateScadenza = maxDate.toISOString().split('T')[0];
        } else {
          this.insertPersona.get('AnpeDatascadenzaidoneitamedica')?.disable();
        }
      });
      this.personaService.dipendente$.subscribe((dipendente)=>
      {
        if(dipendente)
        {
          this.loadComuni();
          this.loadProvince();
          this.showDomicilio = true;
          this.populateForm(dipendente);
        }
      });
      
      this.loadData()
  }

  loadData(): void
  {
    this.serviceRegione.getRegioni().subscribe(regioni => this.listRegioni = regioni);
    this.serviceRegione.getRegioni().subscribe(regioni => this.listRegioniResidenza = regioni);
    this.serviceRegione.getRegioni().subscribe(regioni => this.listRegioniDomicilio = regioni);
    this.servicePaese.getAllPaesi().subscribe(paesi => this.listPaese = paesi);
    this.serviceSocieta.getAllSocieta().subscribe(societa => this.listSocieta = societa);
  }

  loadComuni(): void 
  {
    this.serviceComune.getAllComuni().subscribe(comuni => this.listComuniNascita = comuni);
    this.serviceComune.getAllComuni().subscribe(comuni => this.listComuniResidenza = comuni);
    this.serviceComune.getAllComuni().subscribe(comuni => this.listComuniDomicilio = comuni);
  }

  loadProvince(): void
  {
    this.serviceProvince.getAllProvince().subscribe(province =>this.listProvince = province);  
    this.serviceProvince.getAllProvince().subscribe(province =>this.listProvinceResidenza = province);
    this.serviceProvince.getAllProvince().subscribe(province =>this.listProvinceDomicilio = province);  
  }
  
  
  populateForm(dipendente: any): void {
    // Popolamento delle informazioni relative al luogo di nascita
    this.populateLuogoNascita(dipendente);
  
    // Popolamento delle informazioni relative alla residenza
    this.populateResidenza(dipendente);
  
    // Popolamento delle informazioni relative al domicilio
    this.populateDomicilio(dipendente);
  
    // Formattazione della data di nascita
    const dataNascita = FormattaData.formattaData(dipendente.anpeDatanascita)
    const dataIdoneitaMedica = FormattaData.formattaData(dipendente.anpeDataidoneitamedica)
    const dataScadenzaIdoneitaMedica = FormattaData.formattaData(dipendente.anpeDatascadenzaidoneitamedica)
    
    // Popolamento delle informazioni personali
    this.insertPersona.patchValue({
      AnpePersonaid : dipendente.anpePersonaid,
      AnpeNome: dipendente.anpeNome,
      AnpeCognome: dipendente.anpeCognome,
      AnpeDatanascita: dataNascita,
      AnpeCodicefiscale: dipendente.anpeCodicefiscale,
      AnpePartitaiva: dipendente.anpePartitaiva,
      AnpeFkGepaPaeseidPaesenascita: dipendente.anpeFkGepaPaeseidPaesenascita,
      AnpeFkGecoComuneidComunenascita: dipendente.anpeFkGecoComuneidComunenascita,
      AnpeFkGepaPaeseidPaeseresidenza: dipendente.anpeFkGepaPaeseidPaeseresidenza,
      AnpeFkGecoComuneidComuneresidenza: dipendente.anpeFkGecoComuneidComuneresidenza,
      AnpeIndirizzoresidenza: dipendente.anpeIndirizzoresidenza,
      AnpeNumerocivicoresidenza: dipendente.anpeNumerocivicoresidenza,
      AnpeCapresidenza: dipendente.anpeCapresidenza,
      AnpeFkGepaPaeseidPaesedomicilio: dipendente.anpeFkGepaPaeseidPaesedomicilio,
      AnpeFkGecoComuneidComunedomicilio: dipendente.anpeFkGecoComuneidComunedomicilio,
      AnpeIndirizzodomicilio: dipendente.anpeIndirizzodomicilio,
      AnpeNumerocivicodomicilio: dipendente.anpeNumerocivicodomicilio,
      AnpeCapdomicilio: dipendente.anpeCapdomicilio,
      AnpeNtelefono1: dipendente.anpeNtelefono1,
      AnpeNtelefono2: dipendente.anpeNtelefono2,
      AnpeDataidoneitamedica : dataIdoneitaMedica,
      AnpeDatascadenzaidoneitamedica : dataScadenzaIdoneitaMedica,
      AnpeEmailaziendale: dipendente.anpeEmailaziendale,
      AnpeEmailpersonale: dipendente.anpeEmailpersonale,
      AnpeFkAnsoSocietaid: dipendente.anpeFkAnsoSocietaid
    });
  }
  
  populateLuogoNascita(dipendente: any): void {
    
    this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComunenascita).subscribe({
      next: (idProvincia) => {
        this.idProvinciaNascita = idProvincia;
        this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaNascita).subscribe({
          next: (idRegione) => {
            this.idRegioneNascita = idRegione;
            this.insertPersona.patchValue({
              RegioneNascita: this.idRegioneNascita,
              ProvinciaNascita: this.idProvinciaNascita
            });
          }
        });
      }
    });
  }
  
  populateResidenza(dipendente: any): void {
    
    this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComuneresidenza).subscribe({
      next: (idProvincia) => {
        
        this.idProvinciaResidenza = idProvincia;
        this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaResidenza).subscribe({
          next: (idRegione) => {
            
            this.idRegioneResidenza = idRegione;
            this.insertPersona.patchValue({
              RegioneResidenza: this.idRegioneResidenza,
              ProvinciaResidenza: this.idProvinciaResidenza
            });
          }
        });
      }
    });
  }
  
  populateDomicilio(dipendente: any): void {
    if(dipendente.anpeFkGecoComuneidComunedomicilio == null)
    {
      dipendente.anpeFkGecoComuneidComunedomicilio = 0;
    }
    this.serviceComune.getProvinciaByIdComune(dipendente.anpeFkGecoComuneidComunedomicilio).subscribe({
      next: (idProvincia) => {
        
        this.idProvinciaDomicilio = idProvincia;
        this.serviceProvince.getRegioneByIdProvincia(this.idProvinciaDomicilio).subscribe({
          next: (idRegione) => {
            
            this.idRegioneDomicilio = idRegione;
            this.insertPersona.patchValue({
              RegioneDomicilio: this.idRegioneDomicilio,
              ProvinciaDomicilio: this.idProvinciaDomicilio
            });
          }
        });
      }
    });
  }
  

  onCheckboxChange(event: any) {
    this.showDomicilio = event.target.checked;
    }

  onRegionChangeDomicilio(event : any)
  {
    const idRegione = event.target.value
    this.serviceProvince.getProvinceByRegione(idRegione).subscribe
    ((province : any)=>
    {
      this.listProvinceDomicilio = province
    })
  }

  insertUser()
  {
    if(this.insertPersona.valid)
    {
      const personaObj = this.insertPersona.value;
      this.personaService.salvaPersona(personaObj, this.selectedFiles)
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
              this.insertPersona.reset();
              this.selectedFiles = []
              this.isTableVisibile = false;
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
      ValidateForm.validateAllFormFields(this.insertPersona);
      this.dialog.open(ResponseDialogComponent,
        {
          width: 'auto',
          height: 'auto',
        });
    }
  }

  clearSearch()
  {
    this.insertPersona.reset();
  }

  goBack() : void
  {
    this.location.back();
  }

  onRegionChangeResidenza(event : any)
  {
    const idRegione = event.target.value
    this.serviceProvince.getProvinceByRegione(idRegione).subscribe
    ((province : any)=>
    {
      this.listProvinceResidenza = province
    })
  }

  onRegionChangeNascita(event : any)
  {
    const idRegione = event.target.value
    this.serviceProvince.getProvinceByRegione(idRegione).subscribe
    ((province : any)=>
    {
      this.listProvince = province
    })
  }

  onChangeProvinciaDomicilio(event:any)
  {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
    ((comuni : any)=>
    {
      this.listComuniDomicilio = comuni
    })
  }
  
  onChangeProvinciaResidenza(event: any)
  {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
    ((comuni : any)=>
    {
      this.listComuniResidenza = comuni
    })
  }
    
  onProvinciaNascitaChage(event: any)
  {
    const idProvince = event.target.value
    this.serviceComune.getComuniByProvinceId(idProvince).subscribe
    ((comuni : any)=>
    {
      this.listComuniNascita = comuni
    })
  }

  /*addFile()
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
                this.isTableVisibile = true;
              }
              else
              {
                alert('Il file selezionato è giá stato inserito!')
              }
            }
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
    }*/
  }