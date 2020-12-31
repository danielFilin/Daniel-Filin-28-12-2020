import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from 'src/app/models/email.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  messageForm: FormGroup;
  submitButtonClicked = false;
  infoMessage: String;
  messageClass: Boolean;
  currentUserId: String;

  constructor(private messagesService: MessagesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.messageForm = new FormGroup({
      'subject': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
      'content': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]),
      'recieverId': new FormControl(null, [Validators.required]),
      'senderId': new FormControl(null, [Validators.required]),
    });
    this.messagesService.getInfoMessage().subscribe((message: String) => {
      if (message === 'message was added') {
        this.infoMessage = 'Your message was sent';
        this.messageClass = false;
      } else {
        this.infoMessage = 'Your message failed to sent, please try again';
        this.messageClass = false;
      }
    });
  }

  onAddEmail() {
    if (this.messageForm.invalid) {
      this.submitButtonClicked = true;
      return;
    }
    const email: Email = {
      subject: this.messageForm.value.subject,
      content: this.messageForm.value.content,
      recieverId: this.messageForm.value.recieverId,
      senderId: this.messageForm.value.senderId,
      date: Date.now(),
      _id: null
    }

    this.messagesService.addEmail(email);
    this.messageForm.setValue({
      subject: '',
      content: '',
      recieverId: '',
      senderId: this.currentUserId,
    });
    this.messageForm.markAsPristine();
    this.messageForm.markAsUntouched();
  }

}
