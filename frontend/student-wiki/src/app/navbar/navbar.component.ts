import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  user: User;

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  displayIfUserIs(role: string) {
    return this.user && this.user.roles && this.user.roles.includes(role);
  }

  logout() {
    this.authService.logout();
  }

}
