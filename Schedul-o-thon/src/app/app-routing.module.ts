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
import { UpComingEventsComponent } from './user-dashboard/up-coming-events/up-coming-events.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MainComponent } from './user-dashboard/main/main.component';
import { UpdateBatchFormComponent } from './update-batch-form/update-batch-form.component';
import { UpdateSubBatchFormComponent } from './update-sub-batch-form/update-sub-batch-form.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SubBatchComponent } from './sub-batch/sub-batch.component';
import { EventFormComponent } from './event-form/event-form.component';
const routes: Routes = [{ path:'landing',component:LandingPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'login',component:LoginPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'batch-form',component:BatchComponent},
    {path:'batch-cards',component:BatchCardComponent},
    {path:'landing',component:LandingPageComponent},
    {path:'userdashboard',component:UserDashboardComponent,children:[
      {path:'calendar',component:MainComponent},
      {path:'events',component:UpComingEventsComponent},
      {path:'attendance',component:AttendanceComponent},
    ]},
    {path:'subbatch-form',component:SubBatchComponent},
    {path:'profile',component:ProfileComponent},
    {path:'section',component:SectionFormComponent},
    {path:'calendar',component:CalendarComponent},
    {path: 'subbatches/:fbatch_id',component:SubbatchCardComponent},
    {path:'sections/:sub_batch_id',component:SectionCardsComponent},
    {path: 'batches/:batch_id',component:BatchCardComponent},
    {path:'update_batch/:batch_id',component:UpdateBatchFormComponent},
    {path:'update_sub_batch/:sub_batch_id',component:UpdateSubBatchFormComponent},
    {path:'event-form',component:EventFormComponent},
    {path:'admindashboard',component:AdminDashboardComponent},
    {path:'',component:LandingPageComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
