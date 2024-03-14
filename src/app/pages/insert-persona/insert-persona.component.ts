import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Persona } from '../../dto/request/persona';
import { RegioneService } from '../../service/regione.service';
import { PaesiService } from '../../service/paesi.service';
import { SocietaService } from '../../service/societa.service';
import { ProvinceService } from '../../service/province.service';
import { ComuniService } from '../../service/comuni.service';

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

constructor(private fb : FormBuilder,private auth: AuthService, private serviceRegione: RegioneService, private servicePaese:PaesiService, private serviceSocieta:SocietaService, private serviceProvince:ProvinceService, private serviceComune:ComuniService)
{}
  ngOnInit(): void {
   this.insertPersona = this.fb.group(
    {
      nome : ['',Validators.required],
      cognome : ['',Validators.required],
      dataNascita : ['',Validators.required],
      luogoNascita : ['',Validators.required],
      codiceFiscale : ['',Validators.required],
      comuneResidenza : ['',Validators.required],
      indirizzoResidenza : ['',Validators.required],
      numeroCivicoResidenza : ['',Validators.required],
      comuneDomicilio : ['',Validators.required],
      indirizzoDomicilio : ['',Validators.required],
      capResidenza : ['',Validators.required],
      emailAziendale : ['',Validators.required],
      societaId : ['',Validators.required]
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

  onRegionChangeDomicilio(event : any)
  {
    const idRegione = event.target.value
    this.serviceProvince.getProvinceByRegione(idRegione).subscribe
    ((province : any)=>
    {
      this.listProvinceDomicilio = province
    })
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

  insertUser()
  {
    this.nuovaPersona = this.creaPersona()

    this.auth.insertPersona(this.nuovaPersona)
    .subscribe(
      {
        next:(res) =>
          {
            console.log(res.message)
            this.insertPersona.reset();
          },
          error:(err) => 
          {
            console.log(err.error.message)
          }
      })
  }

  creaPersona(): Persona {

    let persona : Persona = {
      nome: this.insertPersona.get('nome')?.value,
      personaId: null,
      cognome: this.insertPersona.get('cognome')?.value,
      dataNascita: this.insertPersona.get('dataNascita')?.value,
      societaId: this.insertPersona.get('societaId')?.value,
      codiceFiscale: this.insertPersona.get('codiceFiscale')?.value,
      luogoNascita: null,
      //comuneNascita: null,
      //comuneResidenza: null,
      //comuneDomicilio: null,
      //toponimoResidenza: null,
      //toponimoDomicilio: null,
      indirizzoResidenza: this.insertPersona.get('indirizzoResidenza')?.value,
      numeroCivicoResidenza: this.insertPersona.get('numeroCivicoResidenza')?.value,
      capResidenza: this.insertPersona.get('capResidenza')?.value,
      indirizzoDomicilio: this.insertPersona.get('indirizzoDomicilio')?.value,
      numeroCivicoDomicilio:  this.insertPersona.get('numeroCivicoResidenza')?.value,
      capDomicilio: this.insertPersona.get('capResidenza')?.value,
      //telefono1: null,
      //telefono2: null,
      emailAziendale: this.insertPersona.get('emailAziendale')?.value,
      //emailPersonale: null,
      //sysuser: 'test'
      provinciaNascita : null
    }

    return persona;

  }

}


