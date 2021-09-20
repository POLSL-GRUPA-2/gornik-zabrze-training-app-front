import { Component, OnInit } from '@angular/core'
import { CalendarService } from 'src/app/services/calendar/calendar.service'
import { PlayerService } from 'src/app/services/player/player.service'
import { TaskService } from 'src/app/services/task/task.service'
import { UserService } from 'src/app/services/user/user.service'
import { User } from 'src/app/_models/user'
import { Task } from 'src/app/_models/Task'

@Component({
  selector: 'app-coach-task-list',
  templateUrl: './coach-task-list.component.html',
  styleUrls: ['./coach-task-list.component.scss'],
})
export class CoachTaskListComponent implements OnInit {
  tasks: Task[] = []
  tasksDone: Task[] = []
  tasksTODO: Task[] = []

  tasksTeam: Task[] = []
  tasksDoneTeam: Task[] = []
  tasksTODOTeam: Task[] = []

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
        this.tasksDone = this.tasks.filter((taskoo) => taskoo.done == true)
        this.tasksTODO = this.tasks.filter((taskoo) => taskoo.done == false)
      },
      (err) => {}
    )
    this.taskService.getTeamTasksCoachId().subscribe((res) => {
      this.tasksTeam = res
      this.tasksDoneTeam = this.tasksTeam.filter(
        (taskoo) => taskoo.done == true
      )
      this.tasksTODOTeam = this.tasksTeam.filter(
        (taskoo) => taskoo.done == false
      )
    })
  }

  getTasksDate(): void {
    this.taskService
      .getCurrentTaskDate(
        this.dateStart,
        this.dateEnd,
        localStorage.getItem('playerId')
      )
      .subscribe((res) => {
        this.tasks = res
        this.tasksDone = this.tasks.filter((taskoo) => taskoo.done == true)
        this.tasksTODO = this.tasks.filter((taskoo) => taskoo.done == false)
      })
  }

  onClickDoneTasks() {}
}
