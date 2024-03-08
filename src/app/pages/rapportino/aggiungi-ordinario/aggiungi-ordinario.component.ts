import { Component } from '@angular/core';

@Component({
  selector: 'app-aggiungi-ordinario',
  templateUrl: './aggiungi-ordinario.component.html',
  styleUrl: './aggiungi-ordinario.component.scss'
})
export class AggiungiOrdinarioComponent {

  commesse: any[] = [
    {value: '0', viewValue: 'XXX'},
    {value: '1', viewValue: 'YYY'},
    {value: '2', viewValue: 'ZZZ'},
  ]

  sedi: any[] = [
    {value: '0', viewValue: 'smart-working'},
    {value: '1', viewValue: 'Roma'},
    {value: '2', viewValue: 'Milano'},
  ]

  color: any;
  checked: any;
  disabled: any;




}
