import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatComponent } from './components/chat/chat.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    ChatComponent,
    TeamsComponent,
    TasksComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
