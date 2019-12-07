import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { getCourseRating } from '../helpers/helpers';
import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceMessage } from '../helpers/service-message';
import { displaySnackbar } from '../helpers/snackbar';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  course: Course;
  currentRating: number;
  students: number;
  user: User;
  isEnrolled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCourse();
    this.authService.user.subscribe(user => this.user = user);
  }

  isUserEnrolled() {
    this.isEnrolled = this.course && this.course.enrolledStudents.includes(this.user && this.user.id)
  }

  getCourse() {
    const id = this.route.snapshot.paramMap.get("id");
    this.courseService.getCourseById(id).subscribe(c =>  {
      this.course = c;
      this.currentRating = this.getCurrentRating();
      this.isUserEnrolled();
    });
  }

  getCurrentRating() {
    return getCourseRating(this.course);
  }

  getStudentsAmount() {
    return this.course.enrolledStudents.length;
  }

  isCourseFull() {
    return this.course.enrolledStudents.length >= this.course.maxStudents;
  }

  enroll() {
    if (!this.user) return;

    this.courseService.enrollOnCourse(this.course._id, this.authService.headers)
    .subscribe(
      res => {
        displaySnackbar({success: true, message: "Enrolled on the course"}, this.snackbar);
        this.getCourse();
      },
      ({error}) => displaySnackbar({success: false, message: error.message}, this.snackbar),
      () => console.log("finished enrolling on the course") 
    )
  }

  delist() {
    if (!this.user) return;

    this.courseService.delistFromCourse(this.course._id, this.authService.headers)
    .subscribe(
      res => {
        displaySnackbar({success: true, message: "Delisted from the course"}, this.snackbar)
        this.getCourse();
      },
      ({error}) => displaySnackbar({success: false, message: error.message}, this.snackbar),
      () => console.log("finished delisting from the course") 
    )
  }

}