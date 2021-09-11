import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NotificationsComponent } from './components/notifications/notifications.component'
import { ChatComponent } from './components/chat/chat.component'
import { TeamsComponent } from './components/teams/teams.component'
import { TasksComponent } from './components/tasks/tasks.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TabbarComponent } from './components/tabbar/tabbar.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { UserComponent } from './components/user/user.component'
import { AuthGuard } from './auth.guard'
import { MainPageComponent } from './components/main-page/main-page.component'
import { JwtInterceptorService } from './services/JwtInterceptor/jwt-interceptor.service'
import { LoggedInAuthGuard } from './logged-in-auth.guard';
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component'
// 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TasksTaskListComponent } from './components/tasks-task-list/tasks-task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { MatCardModule } from '@angular/material/card'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

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
    TasksHeaderComponent,
    TasksTaskListComponent,
    TaskItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // 
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  providers: [
    AuthGuard,
    LoggedInAuthGuard,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptorService,
        multi: true,
      },
    ],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
