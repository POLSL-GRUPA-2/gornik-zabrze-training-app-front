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
  tasksDone: Task[] = []
  tasksTODO: Task[] = []

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

    this.getTasks()
  }

  getTasks(): void {
    this.taskService.getCurrentTask(localStorage.getItem('playerId')).subscribe(
      (res) => {
        this.tasks = res
        console.log('tasks got:' + res)
        console.log('this.tasks.length before filter :>> ', this.tasks.length);
        this.tasksDone = this.tasks.filter(taskoo => (taskoo.done == true))
        this.tasksTODO = this.tasks.filter(taskoo => (taskoo.done == false))
        console.log('this.tasksDone.length after filter :>> ', this.tasksDone.length);
        console.log('this.tasksTODO.length after filter :>> ', this.tasksTODO.length);
      },
      (err) => {
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
          this.tasksDone = this.tasks.filter(taskoo => (taskoo.done == true))
          this.tasksTODO = this.tasks.filter(taskoo => (taskoo.done == false))
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
