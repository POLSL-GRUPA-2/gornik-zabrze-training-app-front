import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private currentUserUrl = environment.apiUrl + '/user'

  constructor(private http: HttpClient) { }

  changeUserData(form: FormBuilder): Observable<any> {
    console.log("Post: " + this.currentUserUrl)
    return this.http.patch(this.currentUserUrl, form );
  }
}
