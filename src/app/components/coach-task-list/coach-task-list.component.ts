import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar/calendar.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/_models/user'
import { Task } from 'src/app/_models/Task'
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-coach-task-list',
  templateUrl: './coach-task-list.component.html',
  styleUrls: ['./coach-task-list.component.scss']
})
export class CoachTaskListComponent implements OnInit {
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
    //this is for personal tasks when on player account
    // this.taskService.getCurrentTask(localStorage.getItem('playerId')).subscribe(
    //   (res) => {
    //     this.tasks = res
    //     console.log('tasks got:' + res)
    //     console.log('this.tasks.length before filter :>> ', this.tasks.length);
    //     this.tasksDone = this.tasks.filter(taskoo => (taskoo.done == true))
    //     this.tasksTODO = this.tasks.filter(taskoo => (taskoo.done == false))
    //     console.log('this.tasksDone.length after filter :>> ', this.tasksDone.length);
    //     console.log('this.tasksTODO.length after filter :>> ', this.tasksTODO.length);
    //   },
    //   (err) => {
    //   }
    // )
    //this is for personal tasks when on coach account
    this.taskService.getCurrentTaskByCoachId().subscribe(
      (res) => {
        this.tasks = res
        console.log('personal tasks got:' + res)
        console.log('this.tasks.length before filter :>> ', this.tasks.length);
        this.tasksDone = this.tasks.filter(taskoo => (taskoo.done == true))
        this.tasksTODO = this.tasks.filter(taskoo => (taskoo.done == false))
        console.log('this.tasksDone.length after filter :>> ', this.tasksDone.length);
        console.log('this.tasksTODO.length after filter :>> ', this.tasksTODO.length);
      },
      (err) => {

      }
    )
    //this is for team tasks when on coach account
    this.taskService.getTeamTasksByCoachId().subscribe(
      (res) => {
        console.log('Team tasks: res :>> ', res);
        this.tasksTeam = res
        console.log('team tasks got:' + res)
        console.log('this.tasksTeam.length before filter :>> ', this.tasksTeam.length);
        this.tasksDoneTeam = this.tasksTeam.filter(taskoo => (taskoo.done == true))
        this.tasksTODOTeam = this.tasksTeam.filter(taskoo => (taskoo.done == false))
        console.log('this.tasksDoneTeam.length after filter :>> ', this.tasksDoneTeam.length);
        console.log('this.tasksTODOTeam.length after filter :>> ', this.tasksTODOTeam.length);
      },
      (err) => {
      }
    )
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
          this.tasksDone = this.tasks.filter(taskoo => (taskoo.done == true))
          this.tasksTODO = this.tasks.filter(taskoo => (taskoo.done == false))
          console.log('task dd' + res)
        },
        (err) => {
        }
      )
    //team tasks
    this.teamService.getTeams().subscribe((res) => {
      this.teams = res
      this.teams = this.teams.filter((team) => team.coach_id.toString() == localStorage.getItem('coachId'))
      console.log('this.teams from getTeams() after filter :>> ', this.teams);
      this.teams.forEach(team => {
        this.taskService.getCurrentTeamTaskDate(
          this.dateStart,
          this.dateEnd,
          team.id
        ).subscribe(
          (res) => {
            this.tasksTeam = res
            this.tasksDoneTeam = this.tasksTeam.filter(taskoo => (taskoo.done == true))
            this.tasksTODOTeam = this.tasksTeam.filter(taskoo => (taskoo.done == false))
            console.log('task dd' + res)
          },
          (err) => {

          }
        )
      });
    })
  }

  onClickDoneTasks() {
    this.getTasks()
  }
}
