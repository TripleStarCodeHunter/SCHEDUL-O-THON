import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { BatchComponent } from "./batch/batch.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [{ path:'landing',component:LandingPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'login',component:LoginPageComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'batch',component:BatchComponent},
    {path:'landing',component:LandingPageComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'profile',component:ProfileComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
