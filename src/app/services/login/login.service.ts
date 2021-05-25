import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private loginUrl = environment.apiUrl + '/login';

  constructor(private http:HttpClient) { }

  loginUser(form: FormBuilder): Observable<any>{
    return this.http.post(this.loginUrl, form, {withCredentials: true});
  }
}
