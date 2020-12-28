import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      'subject': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required]),
      'recieverId': new FormControl(null, [Validators.required]),
      'senderId': new FormControl(null, [Validators.required]),
    });
    this.messagesService.getInfoMessage().subscribe((message: String) => {
      if (message === 'message was added') {
        this.infoMessage = 'Your message was sent';
        this.messageClass = false;
      } else {
        this.infoMessage = 'Your message failed was not sent, please try again';
        this.messageClass = true;
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
    }
    this.messagesService.addEmail(email);
    //const info = this.messagesService.getInfoMessage();
    //console.log(info);
    this.messageForm.reset(this.messageForm.value.subject);
    this.messageForm.markAsPristine();
    this.messageForm.markAsUntouched();
  }

}
