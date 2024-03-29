import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PaesiService {
  baseUrl = 'http://localhost:5143/Paese'

  constructor(private http: HttpClient) {}

  getAllPaesi(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + '/GetAllPaesi')
  }
}
