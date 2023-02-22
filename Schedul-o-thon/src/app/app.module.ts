import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import { SubBatchComponent } from './batch/sub-batch/sub-batch.component';
import { SectionComponent } from './batch/sub-batch/section/section.component';

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
    SectionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
