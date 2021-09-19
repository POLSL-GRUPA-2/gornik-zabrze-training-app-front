import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { MatSelect } from '@angular/material/select'
import { ReplaySubject, Subject } from 'rxjs'
import { MessagesService } from 'src/app/services/messages/messages.service'
import { User } from 'src/app/_models'
import { Message } from 'src/app/_models/message'
import { Team } from 'src/app/_models/team'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @ViewChild('target') private myScrollContainer!: ElementRef

  selectedUserId!: string | null
  selectedTeam = ''
  userId!: string | null
  team!: Team
  teams: Team[] = []

  intervalVar: any
  isPerson: string = ''

  message = new FormControl('')
  receiverId = new FormControl('')

  /** list of users */
  protected users: User[] = []

  /** control for the selected user
   * selected user
   */
  public userCtrl: FormControl = new FormControl()

  /** control for the MatSelect filter keyword */
  public userFilterCtrl: FormControl = new FormControl()

  /** list of users filtered by search keyword */
  public filteredUsers: ReplaySubject<User[]> = new ReplaySubject<User[]>(1)

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  messages: Message[] = []

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessagesService
  ) {}

  ngOnInit(): void {
    this.isPerson = localStorage.getItem('isPerson')!
    this.userId = localStorage.getItem('userId')
    if (localStorage.getItem('isPerson') === 'true') {
      this.getMessages()
      this.intervalVar = setInterval(() => {
        this.getMessages()
      }, 1000)
    } else if (localStorage.getItem('isPerson') === 'false') {
      this.getTeamMessages()
      this.intervalVar = setInterval(() => {
        this.getTeamMessages()
      }, 1000)
    }

    //this.redel.nativeElement.value = ''
    this.form = this.formBuilder.group({
      message: this.message,
      reciever_id: localStorage.getItem('selectedUserId'),
      team_id: localStorage.getItem('selectedUserId'),
    })
  }

  ngOnDestroy() {
    this._onDestroy.next()
    this._onDestroy.complete()
    clearInterval(this.intervalVar)
    localStorage.removeItem('selectedUserId')
    localStorage.removeItem('isPerson')
  }

  @ViewChild('filterName') redel!: ElementRef

  sendMessage() {
    let val = this.form.getRawValue()
    console.log('val czyli wysylka :>> ', this.form.getRawValue())

    if (localStorage.getItem('isPerson') === 'true') {
      this.messageService.sendMessage(val).subscribe((res) => {
        this.getMessages()
      })
      this.message = new FormControl('')
    } else if (localStorage.getItem('isPerson') === 'false') {
      this.messageService.sendMessageToTeam(val).subscribe((res) => {
        this.getTeamMessages()
      })
    }

    if (this.form.valid) {
      console.log('Form sent HAHA')
      this.form.reset()
    }

    //this.redel.nativeElement.value = ''
    this.form = this.formBuilder.group({
      message: this.message,
      reciever_id: localStorage.getItem('selectedUserId'),
      team_id: localStorage.getItem('selectedUserId'),
    })
    //form.resetForm()
    //this.form.reset()
  }

  getMessages() {
    this.messageService
      .getMessages(
        localStorage.getItem('userId'),
        localStorage.getItem('selectedUserId')
      )
      .subscribe((res) => {
        this.messages = res
      })
  }

  getTeamMessages() {
    this.messageService
      .getTeamMessages(parseInt(localStorage.getItem('selectedUserId')!))
      .subscribe((res) => {
        this.messages = res
      })
  }

  scrollToElement(el: any): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }
}
