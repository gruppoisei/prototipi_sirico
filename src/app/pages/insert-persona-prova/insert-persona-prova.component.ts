import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Persona } from '../../dto/request/persona';
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

@Component({
  selector: 'app-insert-persona-prova',
  templateUrl: './insert-persona-prova.component.html',
  styleUrl: './insert-persona-prova.component.scss'
})
export class InsertPersonaProvaComponent implements OnInit{

  insertPersona!: FormGroup;
  nuovaPersona ?: Persona
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
  data;
  idProvinciaNascita : any;
  idRegioneNascita : any;
  idProvinciaResidenza: any;
  idRegioneResidenza: any;
  idProvinciaDomicilio: any;
  idRegioneDomicilio: any;

constructor(private personaService : PersonaService, private dialog: MatDialog,
  private location: Location, private fb : FormBuilder,
  private auth: AuthService, private serviceRegione: RegioneService,
  private servicePaese:PaesiService, private serviceSocieta:SocietaService,
  private serviceProvince:ProvinceService, private serviceComune:ComuniService)

{this.data= this.personaService.getData();}

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
        AnpeCodicefiscale: ['', Validators.required],
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
        AnpeCapresidenza: ['', Validators.required],
        AnpeFkGepaPaeseidPaesedomicilio: [],
        AnpeFkGecoComuneidComunedomicilio: [],
        RegioneDomicilio: [],
        ProvinciaDomicilio: [],
        AnpeIndirizzodomicilio: [],
        AnpeNumerocivicodomicilio: [],
        AnpeCapdomicilio: [],
        AnpeNtelefono1: ['', Validators.required],
        AnpeNtelefono2: [''],
        AnpeEmailaziendale: ['', Validators.required],
        AnpeEmailpersonale: [''],
        AnpeFkAnsoSocietaid: ['', Validators.required]
      })

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
    const dataNascita = new Date(dipendente.anpeDatanascita);
    const offset = dataNascita.getTimezoneOffset() * 60000;
    const dataNascitaConOffset = new Date(dataNascita.getTime() - offset);
    const dataFormattata = dataNascitaConOffset.toISOString().split('T')[0];
    
    
    // Popolamento delle informazioni personali
    this.insertPersona.patchValue({
      AnpePersonaid : dipendente.anpePersonaid,
      AnpeNome: dipendente.anpeNome,
      AnpeCognome: dipendente.anpeCognome,
      AnpeDatanascita: dataFormattata,
      AnpeCodicefiscale: dipendente.anpeCodicefiscale,
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
      this.auth.insertPersona(this.insertPersona.value)
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


}