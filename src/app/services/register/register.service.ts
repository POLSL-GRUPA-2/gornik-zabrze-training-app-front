import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = environment.apiUrl + '/register'

  constructor(private http: HttpClient) {}

  registerUser(form: FormBuilder): Observable<any> {
    return this.http.post(this.registerUrl, form)
  }
}
