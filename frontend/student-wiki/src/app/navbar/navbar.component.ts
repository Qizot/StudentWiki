import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  user: User;
  loggedIn$: Subscription;
  user$: Subscription;

  ngOnInit() {
    this.user$ = this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.loggedIn$ = this.authService.isLoggedIn.subscribe(loggedIn => {
      if (this.user$) {
        this.user$.unsubscribe();
      }  
      this.user$ = this.authService.user.subscribe(user => {
          this.user = user;
        });

    });
  }

  ngOnDestroy() {
    this.loggedIn$.unsubscribe();
  }

  displayIfUserIs(role: string) {
    return this.user && this.user.roles && this.user.roles.includes(role);
  }

  isRouteActive(name: string) {
    return this.router.url.includes(name);
  }

  logout() {
    this.authService.logout();
  }

}
