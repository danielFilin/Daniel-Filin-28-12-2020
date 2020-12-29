import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from 'src/app/models/email.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit, OnDestroy {
  messagesSubscription: Subscription;
  onDeleteMessageSubscription: Subscription;
  authStatusSubscription: Subscription;
  allMessages: Email[] = [];
  sentMessages: Email[] = [];
  recievedMessages: Email[] = [];
  currentId: String;
  userIsAuthenticated = false;

  constructor(private messagesService: MessagesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.messagesService.getMessages();
    this.messagesSubscription = this.messagesService.getMessagesUpdateListener().subscribe((message: Email[]) => {
      this.allMessages = message;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.onDeleteMessageSubscription = this.messagesService.getMessageDeleteListener().subscribe( (message: Email[]) => {
      this.allMessages = message;
      this.searchItems(this.currentId);
    })
  }

  searchItems(id) {
    this.currentId = id;
    this.recievedMessages = this.allMessages.filter((message) =>  message.senderId != id.value);
    this.sentMessages = this.allMessages.filter((message) => message.senderId == id.value);
  }

  deleteMessage(id) {
    this.messagesService.deleteMessage(id);
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this.onDeleteMessageSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

}
