import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

//importing task interface
import { Task } from 'src/app/_models/Task'
//importing service - need to add as a provider into a constructor
import { TaskService } from 'src/app/services/task/task.service'
import { UserService } from 'src/app/services/user/user.service'

import { User } from 'src/app/_models/user'
import { PlayerService } from 'src/app/services/player/player.service'
import { CalendarService } from 'src/app/services/calendar/calendar.service'
import { TeamService } from 'src/app/services/team/team.service'
import { Team } from 'src/app/_models/team'

@Component({
  selector: 'app-tasks-task-list',
  templateUrl: './tasks-task-list.component.html',
  styleUrls: ['./tasks-task-list.component.scss'],
})
export class TasksTaskListComponent implements OnInit {
  tasks: Task[] = []
  tasksDone: Task[] = []
  tasksTODO: Task[] = []

  tasksTeam: Task[] = []
  tasksDoneTeam: Task[] = []
  tasksTODOTeam: Task[] = []

  teams: Team[] = []

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
    private teamService: TeamService,
    private calendarData: CalendarService,
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
    // console.log('this.teams after request :>> ', this.teams);
    // this.getTeamTasksFinisher()
  }

  getTasks(): void {
    //this is for personal tasks when on personal account
    this.taskService.getCurrentTask(localStorage.getItem('playerId')).subscribe(
      (res) => {
        this.tasks = res
        // console.log('personal tasks got:' + res)
        // console.log('personal this.tasks.length before filter :>> ', this.tasks.length)
        this.tasksDone = this.tasks.filter((taskoo) => taskoo.done == true)
        this.tasksTODO = this.tasks.filter((taskoo) => taskoo.done == false)
        // console.log(
        //   'personal this.tasksDone.length after filter :>> ',
        //   this.tasksDone.length
        // )
        // console.log(
        //   'personal this.tasksTODO.length after filter :>> ',
        //   this.tasksTODO.length
        // )
      },
      (err) => {}
    )

    //this is for team tasks when on personal account
    this.teamService.getTeamsByPlayerId(Number(localStorage.getItem('playerId'))).subscribe(
      (res) => {
        this.teams = res
        // console.log('number of teams: this.teams :>> ', this.teams);
        this.getTeamTasksFinisher()
      },
      (err) => {
      }
    )
  }

  getTeamTasksFinisher(): void {
    this.tasksTeam = []
    this.teams.forEach((team) => {
      this.taskService.getTeamTasksByTeamId(team.id).subscribe(
        (res) => {
          // console.log('res :>> ', res);
        // this.tasksTeam = res
        // this.tasksTeam.push(this.tasksTeam.length + res);
        res.forEach((task: Task) => {
          this.tasksTeam.push(task)
        });
        // this.tasksTeam.push(res);
        // console.log('this.tasksTeam :>> ', this.tasksTeam);
        // console.log('this.tasksTeam.length before filter :>> ', this.tasksTeam.length);
        this.tasksDoneTeam = this.tasksTeam.filter(taskoo => (taskoo.done == true))
        this.tasksTODOTeam = this.tasksTeam.filter(taskoo => (taskoo.done == false))
        // console.log('team this.tasksDoneTeam.length after filter :>> ', this.tasksDoneTeam.length);
        // console.log('team this.tasksTODOTeam.length after filter :>> ', this.tasksTODOTeam.length);
      },
      (err) => {

      }
      )
    })
  }

  getTasksDate(): void {
    //personal tasks
    this.taskService
      .getCurrentTaskDate(
        this.dateStart,
        this.dateEnd,
        localStorage.getItem('playerId')
      )
      .subscribe(
        (res) => {
          this.tasks = res
          this.tasksDone = this.tasks.filter((taskoo) => taskoo.done == true)
          this.tasksTODO = this.tasks.filter((taskoo) => taskoo.done == false)
          // console.log('task dd' + res)
        },
        (err) => {}
      )
      //team tasks
      this.teams.forEach((team) => {
        this.taskService.getCurrentTeamTaskDate(
        this.dateStart,
        this.dateEnd,
        team.id
      )
      .subscribe(
        (res) => {
          this.tasksTeam = res
          this.tasksDoneTeam = this.tasksTeam.filter((taskoo) => taskoo.done == true)
          this.tasksTODOTeam = this.tasksTeam.filter((taskoo) => taskoo.done == false)
          // console.log('task team' + res)
        },
        (err) => {}
      )
      })
  }

  onClickDoneTasks() {
    
    this.getTasks()
  }
}
