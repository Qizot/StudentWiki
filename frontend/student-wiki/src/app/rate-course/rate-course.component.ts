import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CourseService } from '../course.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Course } from '../models/course';
import { RatingValue } from '../models/rating';
import { ServiceMessage } from '../helpers/service-message';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss']
})
export class RateCourseComponent implements OnInit {

  @Input() course: Course
  currentRating: RatingValue = null;
  user: User;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
  }

  displaySnackbar(message: ServiceMessage) {
    this.snackbar.open(message.message, '', {
      duration: 4000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: message.success ? "success-snackbar" : "failure-snackbar"
    });
  }

  submit() {
    const message = this.courseService.rateCourse(this.course && this.course.id || null, this.user, this.currentRating);
    this.displaySnackbar(message);
  }

}
