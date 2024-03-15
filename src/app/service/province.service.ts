import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  baseUrl = 'http://localhost:5143/Provincia/'
  constructor(private http : HttpClient) { }

  getProvinceByRegione(selectedRegione: any)
  {
    return this.http.get<any>(`${this.baseUrl}GetAllProvinceByIdRegione/${selectedRegione}`)
  }
}
