import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatComponent } from './components/chat/chat.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//remove when backend ready
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/inmemory/in-memory-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';

//********

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    ChatComponent,
    TeamsComponent,
    TasksComponent,
    CalendarComponent,
    TabbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [ AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
