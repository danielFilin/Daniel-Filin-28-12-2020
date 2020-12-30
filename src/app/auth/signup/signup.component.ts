import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  isLoading = false;
  authSubscription: Subscription;
  isErrorOnLogin = false;
  infoMessage = 'The data you provided is incorrect';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.authSubscription = this.authService.getAuthStatusListener().subscribe(authStatus => {
      console.log(authStatus);
      this.isLoading = authStatus;
      this.isErrorOnLogin = true;
    });
  }

  onHandleError() {
    this.isErrorOnLogin = null;
  }

  onSignup() {
    if (this.signupForm.value.email === '' || this.signupForm.value.password === '') {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(this.signupForm.value.email, this.signupForm.value.password);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
