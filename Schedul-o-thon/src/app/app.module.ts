import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
<<<<<<< HEAD


=======
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NavbarComponent } from './navbar/navbar.component';
>>>>>>> 74a6e541c6e83f22c121f1c893aa94c39e6c79d3
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
<<<<<<< HEAD
    
    
=======
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent
>>>>>>> 74a6e541c6e83f22c121f1c893aa94c39e6c79d3
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
