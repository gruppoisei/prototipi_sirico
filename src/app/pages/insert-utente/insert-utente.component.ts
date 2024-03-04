import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InsertUtenteService } from '../../service/insert-utente.service';



@Component({
  selector: 'app-insert-utente',
  templateUrl: './insert-utente.component.html',
  styleUrl: './insert-utente.component.scss'
})

export class InsertUtenteComponent {

  utenteForm: FormGroup = new FormGroup({});
  form: any;
  idPersona: any;
  nome: any;
  cognome: any;
  datanascita: any;
  stipendio: any;
  genereid: any;
  societaid: any;
  ruoloid: any;

  constructor(private formBuilder: FormBuilder) { }

/*   ngOnInit(): void {
    this.utenteForm = this.formBuilder.group({
      idPersona: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      genereid: ['', Validators.required],
      societaid: ['', Validators.required],
      ruoloid: ['', Validators.required],
      stipendio: ['', Validators.required],
      datanascita: ['', Validators.required],
    });
  } */

  inserisciUtente(): void {
    if (this.utenteForm.valid) {
      const formValues = this.utenteForm.value;

      const requestBody = {
        idPersona: formValues.id,
        nome: formValues.nome,
        cognome: formValues.cognome,
        datanascita: formValues.datanascita,
        stipendio: formValues.stipendio,
        genereid: formValues.genere,
        societaid: formValues.societa,
        ruoloid: formValues.ruolo,
      };

      fetch('http://localhost:5112/Persone/InserimentoPersona/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(res => res.json())
        .then(json => {
          console.log('Utente inserito con successo:', json);
          // stampo un controllo qui?
        })
        .catch(error => {
          console.error('Errore durante l\'invio del utente:', error);
        });
    } else {
      console.log('Form non valido. Controlla i campi.');
    }
  }
}
