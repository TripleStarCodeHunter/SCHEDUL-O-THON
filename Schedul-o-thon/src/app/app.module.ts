import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// @NgModule({
//   imports: [
//     [...]
//     FormsModule
//   ],
//   [...]
// })

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
import { NgForm,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register-page/register-page.module';
import { SectionFormComponent } from './section-form/section-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    FooterComponent,
    BatchComponent,
    CalendarComponent,
    SubBatchComponent,
    SectionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RegisterPageModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
