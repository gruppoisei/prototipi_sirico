import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/internal/Observable'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AmministrazioneRuoloService {
  constructor(private Http: HttpClient) {}

  private apiUrl = 'http://localhost:5143/AmministrazioneRuolo' // AGGIORNIAMO QUI L'URL

  getFunzioni(): Observable<any> {
    return this.Http.get<any>(`${this.apiUrl}/GetFunzione`)
  }
}
