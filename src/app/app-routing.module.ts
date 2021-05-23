import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './components/calendar/calendar.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { NotificationsComponent } from './components/notifications/notifications.component';
import { RegisterComponent } from './components/register/register.component';

import { TasksComponent } from './components/tasks/tasks.component';
import { TeamsComponent } from './components/teams/teams.component';

const routes: Routes = [
  { path: 'notifications', component: NotificationsComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'calendar', component: CalendarComponent },
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
