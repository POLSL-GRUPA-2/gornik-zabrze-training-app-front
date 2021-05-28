import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth.guard'

import { CalendarComponent } from './components/calendar/calendar.component'
import { ChatComponent } from './components/chat/chat.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'

import { NotificationsComponent } from './components/notifications/notifications.component'
import { RegisterComponent } from './components/register/register.component'

import { TasksComponent } from './components/tasks/tasks.component'
import { TeamsComponent } from './components/teams/teams.component'
import { LoggedInAuthGuard } from './logged-in-auth.guard'

const routes: Routes = [
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInAuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
