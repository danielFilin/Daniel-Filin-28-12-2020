import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../models/email.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messages: Email[] = [];
  private updatedMessages = new Subject<Email[]>();
  private deleteMessages = new Subject<Email[]>();
  private infoMessage = new Subject();

  constructor(private http: HttpClient, private router: Router) { }


  getMessagesUpdateListener() {
    return this.updatedMessages.asObservable();
  }

  getMessageDeleteListener() {
    return this.deleteMessages.asObservable();
  }

  getInfoMessage() {
    return this.infoMessage.asObservable();
  }

  addEmail(email) {
    this.http.post<{message: string, email: Email}>(`user/new-message`, email)
      .subscribe((responseData) => {
        this.infoMessage.next(responseData.message);
      });
  }

  getMessages() {
    this.http.get<{sentMessages: {sentMessages: Email[]}, recievedMessages: {recievedMessages: Email[]}}>(`user/get-messages`)
      .subscribe((responseData) => {
        this.messages = [...responseData.sentMessages.sentMessages, ...responseData.recievedMessages.recievedMessages];
        this.updatedMessages.next([...this.messages]);
      });
  }

  deleteMessage(id, messageStatus) {
    this.http.delete<{message: string, body: Email[]}>(`user/delete-message/${id}/${messageStatus}`)
      .subscribe(() => {
        const updatedMessages = this.messages.filter(message => message._id !== id);
        this.messages = updatedMessages;
        this.deleteMessages.next([...this.messages]);
      });
  }
}

