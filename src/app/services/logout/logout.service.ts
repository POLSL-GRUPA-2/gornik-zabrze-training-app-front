import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private logoutUrl = environment.apiUrl + '/logout';

  constructor(private http:HttpClient) { }

  logoutUser(): Observable<any>{
    return this.http.get(this.logoutUrl);
  }
}
