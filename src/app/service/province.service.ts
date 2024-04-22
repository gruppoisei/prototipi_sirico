import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  baseUrl = 'http://localhost:5143/Provincia/'
  constructor(private http : HttpClient) { }

  getAllProvince():Observable<any[]>
  {
    return this.http.get<any>(this.baseUrl + 'GetAllProvincie');
  }

  getAllProvinceByRegione(selectedRegione: any)
  {
    return this.http.get<any>(`${this.baseUrl}GetAllProvinceByIdRegione/${selectedRegione}`)
  }

  getRegioneByIdProvincia(idRegione: number) : Observable<number>
  {
    return this.http.get<number>(`${this.baseUrl}GetRegioneByIdProvincia/${idRegione}`)
  }

  getProvinceByIdComune(idComune : number) : Observable<any[]>
  {
    return this.http.get<any>(`${this.baseUrl}GetProvinceByIdComune/${idComune}`)
  }
}
