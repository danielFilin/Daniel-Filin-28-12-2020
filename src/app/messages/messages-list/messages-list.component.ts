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
  inputValue: Boolean = true;
  allMessages: Email[] = [];
  sentMessages: Email[] = [];
  recievedMessages: Email[] = [];
  currentUserId: String;
  userIsAuthenticated = false;
  onDeleteMessageInfo: Boolean = false;


  constructor(private messagesService: MessagesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.messagesService.getMessages();
    this.currentUserId = this.authService.getUserId();
    this.messagesSubscription = this.messagesService.getMessagesUpdateListener().subscribe((responseData) => {
      this.allMessages = responseData;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.onDeleteMessageSubscription = this.messagesService.getMessageDeleteListener().subscribe( (message: Email[]) => {
      this.allMessages = message;
      this.searchItems(this.currentUserId);
      this.onDeleteMessageInfo = true;
      setTimeout(() => {
        this.onDeleteMessageInfo = false;;
      }, 5000);
    })
  }

  searchItems(id) {
    if (id.value) {
      id = id.value;
    }
    this.inputValue = true;
    //this.currentUserId = this.authService.getUserId();
    this.recievedMessages = this.allMessages.filter((message) =>  message.senderId != id);
    this.sentMessages = this.allMessages.filter((message) => message.senderId == id);
  }

  deleteMessage(idToDelete, messageStatus) {
    this.messagesService.deleteMessage(idToDelete, messageStatus);
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
    this.onDeleteMessageSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

}
