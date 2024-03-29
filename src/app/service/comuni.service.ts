import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ComuniService {
  baseUrl = 'http://localhost:5143/Comune/'

  constructor(private http: HttpClient) {}

  getComuniByProvinceId(selectedProvince: any) {
    return this.http.get<any>(`${this.baseUrl}GetAllComuniByIdProvincia/${selectedProvince}`)
  }

  getProvinciaByIdComune(comuneid: number) {
    return this.http.get<any>(`${this.baseUrl}GetProvinciaByIdComune/${comuneid}`)
  }

  getAllComuni(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + 'GetAllComuni')
  }
}
