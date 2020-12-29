import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.module';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    }
    this.http.post<{}>(BACKEND_URL + `signup`, authData)
      .subscribe((responseData) => {
        console.log(responseData);
        //this.infoMessage.next(responseData.message);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    }
    this.http.post<{token: string, expiresIn: number}>(BACKEND_URL + `login`, authData)
      .subscribe((responseData) => {
        this.token = responseData.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const expiresIn = responseData.expiresIn;
          this.setAuthTimer(expiresIn);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(this.token, expirationDate);
          this.router.navigate(['/']);
        }
        //this.infoMessage.next(responseData.message);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    if (!authInformation) {
      return;
    }
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirtationDate = localStorage.getItem('expiration');
    //const userId = localStorage.getItem('userId');

    if (!token || !expirtationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirtationDate)
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer (duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
}
