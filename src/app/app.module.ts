import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'

import { APP_INITIALIZER, NgModule } from '@angular/core'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserModule } from '@angular/platform-browser'
import {  DatePipe,  HashLocationStrategy,  LocationStrategy,} from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NotificationsComponent } from './components/notifications/notifications.component'
import { ChatComponent } from './components/chat/chat.component'
import { TeamsComponent } from './components/teams/teams.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TabbarComponent } from './components/tabbar/tabbar.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { UserComponent } from './components/user/user.component'
import { AuthGuard } from './auth.guard'
import { MainPageComponent } from './components/main-page/main-page.component'
import { JwtInterceptorService } from './services/JwtInterceptor/jwt-interceptor.service'
import { TasksComponent } from './components/tasks/tasks.component'
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component'
import { TasksTaskListComponent } from './components/tasks-task-list/tasks-task-list.component'
import { TaskItemComponent } from './components/task-item/task-item.component'
import { LoggedInAuthGuard } from './logged-in-auth.guard'
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component'
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component'
import { SettingsComponent } from './components/settings/settings.component'
import { MessagesComponent } from './components/messages/messages.component'
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminTeamItemComponent } from './components/admin-team-item/admin-team-item.component';
import { AdminUserItemComponent } from './components/admin-user-item/admin-user-item.component';
import { CoachNewTaskDialogComponent } from './components/coach-new-task-dialog/coach-new-task-dialog/coach-new-task-dialog.component'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search'
import { MessagesListComponent } from './components/messages-list/messages-list.component'
import { NgxScrollTopModule } from 'ngx-scrolltop'
import { MessageItemComponent } from './components/message-item/message-item.component'
import { CoachTasksHeaderComponent } from './components/coach-tasks-header/coach-tasks-header.component'
import { CoachTaskListComponent } from './components/coach-task-list/coach-task-list.component';
import { AdminTeamEditComponent } from './components/admin-team-edit/admin-team-edit.component';
import { AdminTeamAddPlayerComponent } from './components/admin-team-add-player/admin-team-add-player.component';
import { AdminTeamRemovePlayerComponent } from './components/admin-team-remove-player/admin-team-remove-player.component'

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
    MessagesComponent,
    AdminPanelComponent,
    AdminTeamItemComponent,
    AdminUserItemComponent,
    CoachTaskListComponent,
    CoachTasksHeaderComponent,
    CoachNewTaskDialogComponent,
    MessagesListComponent,
    MessageItemComponent,
    AdminTeamEditComponent,
    AdminTeamAddPlayerComponent,
    AdminTeamRemovePlayerComponent,
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
    MatSelectModule,

    MatRadioModule,

    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    NgxScrollTopModule,
    ScrollingModule,

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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
