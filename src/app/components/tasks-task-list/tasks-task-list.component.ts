import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

//importing task interface
import { Task } from 'src/app/_models/Task'
//importing service - need to add as a provider into a constructor
import { TaskService } from 'src/app/services/task/task.service'
import { UserService } from 'src/app/services/user/user.service'

import { User } from 'src/app/_models/user'
import { PlayerService } from 'src/app/services/player/player.service'
import { CalendarService } from 'src/app/services/calendar/calendar.service'

@Component({
  selector: 'app-tasks-task-list',
  templateUrl: './tasks-task-list.component.html',
  styleUrls: ['./tasks-task-list.component.scss'],
})
export class TasksTaskListComponent implements OnInit {
  tasks: Task[] = []
  user!: User
  disabled = true

  userId!: string
  playerId!: string

  dateStart!: string
  dateEnd!: string

  //service argument needed
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private playerService: PlayerService,
    private calendarData: CalendarService
  ) {}

  //subscribing to observable - (return value) => do what we want with it
  ngOnInit(): void {
    // this.getUser()

    this.calendarData.currentDataStart.subscribe((dateStart) => {
      this.dateStart = dateStart
    })

    this.calendarData.currentDataEnd.subscribe((dateEnd) => {
      this.dateEnd = dateEnd
      this.getTasksDate()
    })

    //this.getCurrentUserId()
    this.getTasks()
    //this.getCurrentPlayerId()
    // this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks)
  }

  getTasks(): void {
    this.taskService.getCurrentTask(localStorage.getItem('playerId')).subscribe(
      (res) => {
        this.tasks = res
        console.log('task dd' + res)
        //Emitters.authEmitter.emit(true)
      },
      (err) => {
        //Emitters.authEmitter.emit(false)
      }
    )
  }

  getTasksDate(): void {
    this.taskService
      .getCurrentTaskDate(
        this.dateStart,
        this.dateEnd,
        localStorage.getItem('playerId')
      )
      .subscribe(
        (res) => {
          this.tasks = res
          console.log('task dd' + res)
          //Emitters.authEmitter.emit(true)
        },
        (err) => {
          //Emitters.authEmitter.emit(false)
        }
      )
  }

  onClickDoneTasks() {}
}
