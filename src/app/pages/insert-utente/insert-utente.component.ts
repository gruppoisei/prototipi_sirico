import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-insert-utente',
  templateUrl: './insert-utente.component.html',
  styleUrl: './insert-utente.component.scss'
})
export class InsertUtenteComponent {

  insertForm!: FormGroup;


  constructor(private fb : FormBuilder)
  {
    
  }
}
