import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Persona } from '../../dto/request/persona';
import { RegioneService } from '../../service/regione.service';
import { PaesiService } from '../../service/paesi.service';
import { SocietaService } from '../../service/societa.service';
import { ProvinceService } from '../../service/province.service';
import { ComuniService } from '../../service/comuni.service';
import {Location} from '@angular/common';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import ValidateForm from '../../helpers/validateform';
import { ResponseDialogComponent } from '../../ui/response-dialog/response-dialog/response-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponseDialogComponent } from '../../ui/message-response-dialog/message-response-dialog.component';

@Component({
  selector: 'app-insert-persona',
  templateUrl: './insert-persona.component.html',
  styleUrl: './insert-persona.component.scss'
})
export class InsertPersonaComponent implements OnInit{

  insertPersona !: FormGroup;
  nuovaPersona ?: Persona
  listRegioni: any;
  listPaese: any;
  listSocieta: any;
  listProvince: any;
  selectedRegion: any;
  listProvinceResidenza: any;
  listProvinceDomicilio: any;
  listComuniNascita: any;
  listComuniResidenza: any;
  listComuniDomicilio: any;
  showDomicilio: any;

constructor(private dialog: MatDialog,private location: Location, private fb : FormBuilder,private auth: AuthService, private serviceRegione: RegioneService, private servicePaese:PaesiService, private serviceSocieta:SocietaService, private serviceProvince:ProvinceService, private serviceComune:ComuniService)
{}

  ngOnInit(): void 
  {
    this.insertPersona = this.fb.group(
      {
        AnpeNome: ['', Validators.required],
        AnpeCognome: ['', Validators.required],
        AnpeDatanascita: ['', Validators.required],
        AnpeCodicefiscale: ['', Validators.required],
        AnpeFkGepaPaeseidPaesenascita: ['', Validators.required],
        AnpeFkGecoComuneidComunenascita: ['', Validators.required],
        AnpeFkGepaPaeseidPaeseresidenza: ['', Validators.required],
        AnpeFkGecoComuneidComuneresidenza: ['', Validators.required],
        AnpeIndirizzoresidenza:['', Validators.required],
        AnpeNumerocivicoresidenza: ['', Validators.required],
        AnpeCapresidenza: ['', Validators.required],
        AnpeFkGepaPaeseidPaesedomicilio: [],
        AnpeFkGecoComuneidComunedomicilio: [], 
        AnpeIndirizzodomicilio: [],
        AnpeNumerocivicodomicilio: [],
        AnpeCapdomicilio: [],
        AnpeNtelefono1: ['', Validators.required],
        AnpeNtelefono2: [''],
        AnpeEmailaziendale: ['', Validators.required],
        AnpeEmailpersonale: [''],
        AnpeFkAnsoSocietaid: ['', Validators.required]
      })

    this.serviceRegione.getRegioni().subscribe
    ((regioni: any)=>
    {
      this.listRegioni = regioni;
    })

    this.servicePaese.getAllPaesi().subscribe
    ((paese: any)=>
    {
      this.listPaese = paese;
    })

    this.serviceSocieta.getAllSocieta().subscribe
    ((societa : any)=>
    {
      this.listSocieta = societa;
    })
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