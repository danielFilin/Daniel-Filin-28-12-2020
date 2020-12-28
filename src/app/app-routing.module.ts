import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMessageComponent } from './messages/add-message/add-message.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-message', pathMatch: 'full'},
  { path: 'add-message', component: AddMessageComponent},
  { path: 'show-messages', component: MessagesListComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
