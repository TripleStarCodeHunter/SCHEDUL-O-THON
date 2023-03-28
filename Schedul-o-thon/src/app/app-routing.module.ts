import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BatchComponent } from './batch/batch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SubbatchCardComponent } from './subbatch-card/subbatch-card.component';
import { BatchCardComponent } from './batch-card/batch-card.component';
import { AttendanceComponent } from './user-dashboard/attendance/attendance.component';
import { SectionCardsComponent } from './section-cards/section-cards.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'batch-form', component: BatchComponent },
  { path: 'batch-cards', component: BatchCardComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'section', component: SectionFormComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'subbatches/:fbatch_id', component: SubbatchCardComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'sections/:sub_batch_id', component: SectionCardsComponent },
  { path: 'batches/:batch_id', component: BatchCardComponent },
  { path: '', component: LandingPageComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
