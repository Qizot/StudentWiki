import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CourseService } from '../services/course.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Course } from '../models/course';
import { RatingValue } from '../models/rating';
import { ServiceMessage } from '../helpers/service-message';
import { displaySnackbar } from '../helpers/snackbar';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss'],
})
export class RateCourseComponent implements OnInit, OnChanges {

  @Input() course: Course
  currentRating: RatingValue = null;
  isEnrolled: boolean = false;
  isRated: boolean = false;
  user: User;

  @Output() courseRated = new EventEmitter(); 

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.calculateFields(user);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calculateFields(this.user);
  }

  calculateFields(user: User) {
    if (!this.user) {
      this.isEnrolled = false;
      this.currentRating = null;
      this.isRated = false;
      return;
    }
    
    this.isEnrolled = this.course && this.course.enrolledStudents.includes(this.user && this.user.id)
    const rating = this.course && this.course.ratings.find(r => r.studentId === this.user.id);
    this.isRated = !!rating;
    this.currentRating = rating && rating.rating || null;
  }


  submit() {
    this.courseService.rateCourse(this.course && this.course._id || null, this.authService.headers, this.currentRating)
    .subscribe(
      res => {
        this.courseRated.emit("course rated");
        displaySnackbar({success: true, message: "Course has been rated"}, this.snackbar);
      },
      ({error}) => {
        displaySnackbar({success: false, message: "Failed to rate course: " + error && error.message}, this.snackbar);
      },
      () => console.log("finished rating course")
    );
  }

}
