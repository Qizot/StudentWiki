import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models/course';
import { starRating, getCourseRating } from '../helpers/helpers';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  currentRating: number;

  constructor() { }

  getCurrentRating() {
    return getCourseRating(this.course);
  }

  getStarsString() {
    if (!this.currentRating) return "";
    return starRating(this.currentRating);
  }

  ngOnInit() {
    this.currentRating = this.getCurrentRating();
  }

}
