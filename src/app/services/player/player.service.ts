import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerUrl = environment.apiUrl + '/player'

  constructor(private http: HttpClient) {}

  /** GET current user from the server */
  getCurrentPlayerId(userId: string | null): Observable<any> {
    return this.http.get(this.playerUrl + '?user_id=' + userId)
  }

  createPlayerWithUserId(form: FormBuilder): Observable<any> {
  return this.http.post(this.playerUrl, form)
  }
}
