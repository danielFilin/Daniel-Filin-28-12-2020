import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AddMessageComponent } from './messages/add-message/add-message.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddMessageComponent,
    HeaderComponent,
    MessagesListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
