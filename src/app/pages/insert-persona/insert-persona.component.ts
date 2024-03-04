import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-insert-persona',
  templateUrl: './insert-persona.component.html',
  styleUrl: './insert-persona.component.scss'
})
export class InsertPersonaComponent implements OnInit{

  insertPersona !: FormGroup;

constructor(private fb : FormBuilder,private auth: AuthService)
{}
  ngOnInit(): void {
   this.insertPersona = this.fb.group(
    {
      nome : ['',Validators.required],
      cognome : ['',Validators.required],
      dataNascita : ['',Validators.required],
      luogoNascita : ['',Validators.required],
      comuneResidenza : ['',Validators.required],
      indirizzoResidenza : ['',Validators.required],
      comuneDomicilio : ['',Validators.required],
      indirizzoDomicilio : ['',Validators.required],
      capResidenza : ['',Validators.required],
      emailAziendale : ['',Validators.required],
      societaId : ['',Validators.required]
    })
  }

  insertUser()
  {
    this.auth.insertPersona(this.insertPersona.value)
    .subscribe(
      {
        next:(res) =>
          {
            alert("Persona aggiunta")
            this.insertPersona.reset();
          },
          error:(err) => 
          {
            alert(err?.error.message)
          }
      })
  }

}
