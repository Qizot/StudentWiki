import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginUser, RegisterUser } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { take } from 'rxjs/operators';
import { ServiceMessage } from '../helpers/service-message';

const DOMAIN = environment.domain;

interface AuthToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User>(null);
  private loginErr = new Subject<ServiceMessage>();


  get loginError() {
    return this.loginErr.asObservable();
  }

  get isLoggedIn() {
    const token = localStorage["userToken"];
    if (!token) {
      this.loggedIn.next(false);
      return this.loggedIn.asObservable();
    }

    this.loadUser();
    return this.loggedIn.asObservable();
  }

  loadUser() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + localStorage.getItem("userToken"));

    this.httpClient.get<User>(DOMAIN + "/me", {headers})
      .subscribe(
          user => {
            this.loggedIn.next(true);
            this.currentUser.next(user);
            this.loginErr.next(null);
          },
          ({error}) => {
            this.loggedIn.next(false);
            this.currentUser.next(null);
            this.loginErr.next(error);
          }
      );
  }

  get user() {
    return this.currentUser.asObservable();;
  }

  get headers() {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + localStorage["userToken"]);
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  login(user: LoginUser) {

    const headers = new HttpHeaders().set("Content-Type", "application/json");

    this.httpClient.post<AuthToken>(DOMAIN + "/login", user, { headers }).toPromise()
    .then(response => {
      const {token} = response;

      localStorage["userToken"] = token;
      // localStorage.setItem("userToken", token);
      headers.set("Authorization", token);

      this.loadUser();
    })
    .catch(({error}) => {
      console.log("error while loging in: ", error);
      this.loggedIn.next(false);
      this.loginErr.next(error);
    });
  }

  register(user: RegisterUser) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.post(DOMAIN + "/register", user, {headers}).toPromise()
    .then(response => {
      this.login(user);
      this.loginErr.pipe(take(1)).subscribe(err => {
        if (!err) {
          this.router.navigate(['/home']);
        } else {
          console.log(err);
        }
      })
    })
    .catch(({error}) => {
      this.loginErr.next(error);
      console.log(error);
    })
  }

  logout() {
    localStorage.removeItem("userToken");
    this.loggedIn.next(false);
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

}
