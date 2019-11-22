import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginUser, RegisterUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private currentUser = new BehaviorSubject<User>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get user() {
    return this.currentUser.asObservable();;
  }

  constructor(
    private router: Router
  ) {}

  login(user: LoginUser){
    if (user.email !== '' && user.password !== '' ) { // {3}
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  register(user: RegisterUser) {
    // temporary id
    this.currentUser.next({id: "xxx", ...user});
    this.login(user);
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
