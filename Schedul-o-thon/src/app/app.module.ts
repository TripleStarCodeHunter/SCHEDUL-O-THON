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
import interactionPlugin from '@fullcalendar/interaction'
import { SectionCardsComponent } from './section-cards/section-cards.component';
// import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { EventFormComponent } from './event-form/event-form.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBatchFormComponent } from './update-batch-form/update-batch-form.component';
import { UpdateSubBatchFormComponent } from './update-sub-batch-form/update-sub-batch-form.component';
import { UpdateSectionFormComponent } from './update-section-form/update-section-form.component';
import { UpdateEventFormComponent } from './update-event-form/update-event-form.component';
@NgModule({
  declarations: [
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
    AdminDashboardComponent,
    EventFormComponent,
    UpdateBatchFormComponent,
    UpdateSubBatchFormComponent,
    UpdateSectionFormComponent,
    UpdateEventFormComponent,
    // AdminNavbarComponent,
    // AdminSidebarComponent,
    // FullCalendarModule,
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
    NgbCollapseModule,
    MatCardModule,
    // AdminNavbarComponent,
    AdminSidebarComponent,
    FullCalendarModule,
    NgbModule,
    // CalendarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
