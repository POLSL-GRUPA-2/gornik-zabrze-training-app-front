import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDividerModule } from '@angular/material/divider'
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

import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component'
//
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { TasksTaskListComponent } from './components/tasks-task-list/tasks-task-list.component'
import { TaskItemComponent } from './components/task-item/task-item.component'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTabsModule } from '@angular/material/tabs'

import { LoggedInAuthGuard } from './logged-in-auth.guard'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'

import { MatIconModule } from '@angular/material/icon'

import { DatePipe } from '@angular/common'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component'

import { TaskDialogComponent } from './components/task-dialog/task-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';

import { MatListModule } from '@angular/material/list';
import { SettingsComponent } from './components/settings/settings.component';

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
    CustomSnackbarComponent,
    TaskDialogComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [
    DatePipe,
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
