import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-utility-costi-personale',
  templateUrl: './utility-costi-personale.component.html',
  styleUrl: './utility-costi-personale.component.scss',
})

export class UtilityCostiPersonaleComponent {
  constructor(private http: HttpClient) {}

  stampa() {
    this.http.get<any>('URL_DELLA_TUA_API').subscribe((data) => {
      this.stampaLista(data);
    });
  }

  stampaLista(lista: any[]) {
    //TODO
    console.log(lista);
  }
}
