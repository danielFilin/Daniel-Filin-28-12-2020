import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Email } from 'src/app/models/email.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messagesSubscription: Subscription;
  onDeleteMessageSubscription: Subscription;
  allMessages: Email[] = [];
  sentMessages: Email[] = [];
  recievedMessages: Email[] = [];

  constructor(private messagesService: MessagesService ) { }

  ngOnInit(): void {
    this.messagesService.getMessages();
    this.messagesSubscription = this.messagesService.getMessagesUpdateListener().subscribe((message: Email[]) => {
      this.allMessages = message;
    });

    this.onDeleteMessageSubscription = this.messagesService.getMessageDeleteListener().subscribe( (message: Email[]) => {
      this.allMessages = message;
      this.searchItems(1);
    })
  }

  searchItems(id) {
    this.recievedMessages = this.allMessages.filter((message) =>  message.senderId != id.value);
    this.sentMessages = this.allMessages.filter((message) => message.senderId == id.value);
  }

  deleteMessage(id) {
    this.messagesService.deleteMessage(id);
  }

}
