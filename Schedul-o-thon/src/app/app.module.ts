import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BatchComponent } from './batch/batch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SubBatchComponent } from './sub-batch/sub-batch.component';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register-page/register-page.module';
import { SectionFormComponent } from './section-form/section-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BatchCardComponent } from './batch-card/batch-card.component';
import { SubbatchCardComponent } from './subbatch-card/subbatch-card.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatCardModule} from "@angular/material/card";
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
 import {FontawesomeObject} from '@fortawesome/fontawesome-svg-core';
import { SectionCardsComponent } from './section-cards/section-cards.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHeaderComponent } from './user-dashboard/user-header/user-header.component';
import { UserSidebarComponent } from './user-dashboard/user-sidebar/user-sidebar.component';
import { MainComponent } from './user-dashboard/main/main.component';
import { faFontAwesome,faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserSidebarModule } from './user-dashboard/user-sidebar/user-sidebar.module';
import { AttendanceComponent } from './user-dashboard/attendance/attendance.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    FooterComponent,
    BatchComponent,
    CalendarComponent,
    SubBatchComponent,
    SectionFormComponent,
    AppComponent,
    BatchCardComponent,
    SubbatchCardComponent,
    LandingPageComponent,
    ProfileComponent,
    DashboardComponent,
    SectionCardsComponent,
    UserDashboardComponent,
    UserHeaderComponent,
    UserSidebarComponent,
    MainComponent,
    AttendanceComponent
    // AdminSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RegisterPageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSidenavModule,
    // NgbCollapseModule,
    MatCardModule,
    AdminSidebarComponent,
    FullCalendarModule,
    FontAwesomeModule,
    UserSidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
