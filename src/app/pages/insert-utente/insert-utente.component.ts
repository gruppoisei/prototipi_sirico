import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InsertUtenteService } from '../../service/insert-utente.service';



@Component({
  selector: 'app-insert-utente',
  templateUrl: './insert-utente.component.html',
  styleUrl: './insert-utente.component.scss'
})

export class InsertUtenteComponent implements OnInit{


  insertForm!: FormGroup;


  constructor(private fb : FormBuilder)
  {
    
  }
}
