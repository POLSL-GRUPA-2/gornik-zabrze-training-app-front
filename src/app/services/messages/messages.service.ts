import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { BehaviorSubject, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messagesUrl = environment.apiUrl + '/message'
  private teamMessagesUrl = environment.apiUrl + '/team_message'

  private selectedUserToMessage = new BehaviorSubject<string>('')

  currentSelectedUserToMessage = this.selectedUserToMessage.asObservable()

  constructor(private http: HttpClient) {}

  changeSelectedUser(message: string) {
    this.selectedUserToMessage.next(message)
  }

  sendMessage(form: FormBuilder): Observable<any> {
    return this.http.post(this.messagesUrl, form)
  }

  getMessages(
    senderId: string | null,
    recieverId: string | null
  ): Observable<any> {
    return this.http.get(
      this.messagesUrl + '?sender_id=' + senderId + '&reciever_id=' + recieverId
    )
  }

  getLastMessages(userId: string | null): Observable<any> {
    return this.http.get(this.messagesUrl + '?user_id=' + userId)
  }

  getTeamMessages(
    teamId: string | null,
    senderId: string | null
  ): Observable<any> {
    return this.http.get(
      this.teamMessagesUrl + '?team_id=' + teamId + '&sender_id=' + senderId
    )
  }
}
