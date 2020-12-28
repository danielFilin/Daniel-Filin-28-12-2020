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
    this.http.post<{message: string, email: Email}>(BACKEND_URL + `user/new-message`, email)
      .subscribe((responseData) => {
        this.infoMessage.next(responseData.message);
      });
  }

  getMessages() {
    this.http.get<{message: string,  body: Email[]}>(BACKEND_URL + `user/get-messages`)
      .subscribe((responseData) => {
        this.messages = responseData.body;
        console.log(this.messages);
        this.updatedMessages.next([...this.messages]);
      });
  }

  deleteMessage(id) {
    this.http.delete<{message: string, body: Email[]}>(BACKEND_URL + `user/delete-message/${id}`)
      .subscribe((responseData) => {
        this.messages = responseData.body;
        console.log(this.messages)

        this.deleteMessages.next([...this.messages]);
      });
  }
}

