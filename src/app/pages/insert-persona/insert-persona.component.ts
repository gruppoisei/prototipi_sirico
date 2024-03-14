import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Persona } from '../../dto/request/persona';
import { RegioneService } from '../../service/regione.service';
import { PaesiService } from '../../service/paesi.service';
import { SocietaService } from '../../service/societa.service';

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

constructor(private fb : FormBuilder,private auth: AuthService, private serviceRegione: RegioneService, private servicePaese: PaesiService, private serviceSocieta: SocietaService)
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
    ((data: any)=>
    {
      this.listRegioni = data;
    })

    this.servicePaese.getAllPaesi().subscribe
    ((data: any)=>
    {
      this.listPaese = data;
    })
    this.serviceSocieta.getAllSocieta().subscribe
    ((data : any)=>
    {
      this.listSocieta = data;
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


