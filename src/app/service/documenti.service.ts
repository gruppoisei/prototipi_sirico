import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentiService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:5143/Documenti/"

  verificaAllegato(file : File)
  {
    const formData = new FormData();
    formData.append('file', file)
    return this.http.post<any>(`${this.baseUrl}VerificaAggiungiAllegato`,formData)
  }

  GetFilesByDipendenteId(idPersona : number) : Observable<File[]>
  {
    return this.http.get<File[]>(`${this.baseUrl}GetFilesByDipendenteId/${idPersona}`)
  }

}
