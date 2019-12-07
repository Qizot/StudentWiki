import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models/course';
import { starRating, getCourseRating } from '../helpers/helpers';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  currentRating: number;
  isEnrolled: boolean = false;
  user: User;

  constructor(private authService: AuthService) { }

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
