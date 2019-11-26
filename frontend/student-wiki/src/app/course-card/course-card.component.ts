import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models/course';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../course.service';
import { starRating } from '../helpers/start-rating';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;

  currentRating: number;
  commentsCount: number;

  constructor() { }

  getCurrentRating() {
    let n = this.course.ratings.length;
    let sum = 0;
    this.course.ratings.forEach(rating => sum += rating.rating);
    return sum / n;
  }

  getStarsString() {
    if (!this.commentsCount) return "";
    return starRating(this.currentRating);
  }

  getCommentCount() {
    return this.course.courseTeachers
      .reduce(
        (acc, ct) => acc + ct.commentCategories.reduce((acc, c) => acc + c.comments.length, 0), 
      0);
  }

  ngOnInit() {
    this.currentRating = this.getCurrentRating();
    this.commentsCount = this.getCommentCount();

  }

}
