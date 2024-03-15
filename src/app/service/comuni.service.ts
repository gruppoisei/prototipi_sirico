import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  baseUrl = "http://localhost:5143/Comune/"

  constructor(private http: HttpClient) { }

  getComuniByProvinceId(selectedProvince:any)
  {
    return this.http.get<any>(`${this.baseUrl}GetAllComuniByIdProvincia/${selectedProvince}`)
  }
}
