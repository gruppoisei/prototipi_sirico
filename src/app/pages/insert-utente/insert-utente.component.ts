import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-insert-utente',
  templateUrl: './insert-utente.component.html',
  styleUrl: './insert-utente.component.scss'
})
export class InsertUtenteComponent implements OnInit{


  insertForm!: FormGroup;


  constructor(private fb : FormBuilder)
  {  }

  ngOnInit(): void {
    this.insertForm = this.fb.group(
      {
        username : ['',Validators.required],
        password : ['',Validators.required]
      })
  }
}
