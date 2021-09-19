import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { Team } from 'src/app/_models/team'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsUrl = environment.apiUrl + '/team'

  constructor(private http: HttpClient) {}

  getTeams(): Observable<any> {
    return this.http.get(this.teamsUrl)
  }

  addPlayerToTeam(form: FormBuilder): Observable<any> {
  return this.http.post(this.teamsUrl + '_assignment', form)
  }

  deleteTeamById(teamId: number): Observable<any> {
    return this.http.delete(this.teamsUrl + '?team_id=' + teamId)
  }



}
