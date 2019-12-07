import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginUser, RegisterUser } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOMAIN } from '../config';
import { take, map } from 'rxjs/operators';

interface AuthToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private currentUser = new BehaviorSubject<User>(null);

  get isLoggedIn() {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return of(false);
    }

    if (this.loggedIn) {
      return of(true);
    }

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + token)

    return this.httpClient.get<User>(DOMAIN + "/me", {headers})
      .pipe(
        take(1),
        map((user: User, error) => {
          if (error)
            return false;
          this.loggedIn = true;
          this.currentUser.next(user);
          return true;
        })
      );
  }

  get user() {
    return this.currentUser.asObservable();;
  }

  get headers() {
    return new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + localStorage.getItem("userToken"));
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

      localStorage.setItem("userToken", token);
      headers.set("Authorization", token);

      this.loggedIn = true;
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.loggedIn = false;
      console.log(err);
    });
  }

  register(user: RegisterUser) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.post(DOMAIN + "/register", user, {headers}).toPromise()
    .then(response => {
      this.login(user);
    })
    .catch(err => {
      console.log(err);
    })
  }

  logout() {
    this.loggedIn = false;
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

}
