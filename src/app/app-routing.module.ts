import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddMessageComponent } from './messages/add-message/add-message.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-message', pathMatch: 'full'},
  { path: 'add-message', component: AddMessageComponent, canActivate: [AuthGuard]},
  { path: 'show-messages', component: MessagesListComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
