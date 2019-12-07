import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';
import { starRating, getCourseRating } from '../helpers/helpers';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { CourseService } from '../services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { displaySnackbar } from '../helpers/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  @Input() enableModifiers: boolean
  @Output() courseDeleted = new EventEmitter();
  currentRating: number;
  isEnrolled: boolean = false;
  user: User;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  deleteCourse() {
    this.courseService.deleteCourse(this.course._id, this.authService.headers).subscribe(
      success => {
        displaySnackbar({success: true, message: "Course has been deleted"}, this.snackbar);
        this.courseDeleted.emit(true);
      },
      ({error}) => {
        displaySnackbar(error, this.snackbar);
      }
    )
  }

  editCourse() {
    this.router.navigate([`/courses/edit/${this.course._id}`]);
  }

  getCurrentRating() {
    return getCourseRating(this.course);
  }

  getStarsString() {
    if (!this.currentRating) return "";
    return starRating(this.currentRating);
  }

  isUserEnrolled() {
    this.isEnrolled = this.course && this.course.enrolledStudents.includes(this.user && this.user.id)
  }

  ngOnInit() {
    this.currentRating = this.getCurrentRating();
    this.isUserEnrolled();
  }

}
