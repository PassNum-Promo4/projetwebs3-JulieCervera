import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl,user)
  }
 
  loginUser(user) {
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn() {
    return !!localStorage.getItem('local_token')
  }

  logoutUser(){
    localStorage.removeItem('local_token');
    this._router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('local_token');
  }
}

