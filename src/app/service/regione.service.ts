import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegioneService {
  baseUrl = 'http://localhost:5143/Regione/'
  constructor(private http: HttpClient) {}

  getRegioni(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'GetAllRegioni')
  }
}
