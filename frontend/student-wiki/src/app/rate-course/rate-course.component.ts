import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CourseService } from '../services/course.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Course } from '../models/course';
import { RatingValue } from '../models/rating';
import { ServiceMessage } from '../helpers/service-message';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss'],
})
export class RateCourseComponent implements OnInit, OnChanges {

  @Input() course: Course
  currentRating: RatingValue = null;
  isEnrolled: boolean;
  user: User;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => this.user = user);
    this.isUserEnrolled();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isUserEnrolled()
  }

  isUserEnrolled() {
    this.isEnrolled = this.course && this.course.enrolledStudents.includes(this.user && this.user.id)
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
    this.courseService.rateCourse(this.course && this.course._id || null, this.authService.headers, this.currentRating)
    .subscribe(
      res => this.displaySnackbar({success: true, message: "Course has been rated"}),
      ({error}) => {
        console.log(error);
        this.displaySnackbar({success: false, message: "Failed to rate course: " + error && error.message})
      },
      () => console.log("finished rating course")
    );
  }

}
