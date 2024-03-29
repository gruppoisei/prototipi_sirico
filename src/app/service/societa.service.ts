import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SocietaService {
  baseUrl = 'http://localhost:5143/GestioneContratto'
  constructor(private http: HttpClient) {}

  getAllSocieta(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/GetSocieta')
  }
}
