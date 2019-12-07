import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { starRating, getCourseRating } from '../helpers/helpers';
import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceMessage } from '../helpers/service-message';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  course: Course;
  currentRating: number;
  user: User;
  isEnrolled: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCourse();
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

  isUserEnrolled() {
    this.isEnrolled = this.course && this.course.enrolledStudents.includes(this.user && this.user.id)
  }

  getCourse() {
    const id = this.router.snapshot.paramMap.get("id");
    console.log(id);
    this.courseService.getCourseById(id).subscribe(c =>  {
      this.course = c;
      this.currentRating = this.getCurrentRating();
      this.isUserEnrolled();
    });
  }

  getCurrentRating() {
    return getCourseRating(this.course);
  }

  getStars() {
    return starRating(this.currentRating);
  }

  enroll() {
    if (!this.user) return;

    this.courseService.enrollOnCourse(this.course._id, this.authService.headers)
    .subscribe(
      res => {
        this.displaySnackbar({success: true, message: "Enrolled on the course"});
        this.getCourse();
      },
      ({error}) => this.displaySnackbar({success: false, message: error.message}),
      () => console.log("finished enrolling on the course") 
    )
  }

  delist() {
    if (!this.user) return;

    this.courseService.delistFromCourse(this.course._id, this.authService.headers)
    .subscribe(
      res => {
        this.displaySnackbar({success: true, message: "Delisted from the course"})
        this.getCourse();
      },
      ({error}) => this.displaySnackbar({success: false, message: error.message}),
      () => console.log("finished delisting from the course") 
    )
  }

}