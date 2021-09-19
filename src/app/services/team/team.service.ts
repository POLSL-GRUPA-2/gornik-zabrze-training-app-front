import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
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

  getTeamTasksCoachId(coachId: string | null): Observable<any> {
    return this.http.get(this.teamsUrl + '?coach_id=' + coachId)
  }

  getTeamTasksPlayerId(playerId: string | null): Observable<any> {
    return this.http.get(this.teamsUrl + '?player_id=' + playerId)
  }
}
