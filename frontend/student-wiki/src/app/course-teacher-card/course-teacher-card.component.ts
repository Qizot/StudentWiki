import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { CourseTeacher, CommentCategory, Teacher } from '../models/teacher';
import { starRating } from '../helpers/start-rating';

interface TeacherRating {
  category: string;
  value: number;
  stars: string;
}

@Component({
  selector: 'app-course-teacher-card',
  templateUrl: './course-teacher-card.component.html',
  styleUrls: ['./course-teacher-card.component.scss'],
})
export class CourseTeacherCardComponent implements OnInit, OnChanges {

  @Input() courseTeacher: CourseTeacher;
  ratingCategories: TeacherRating[];
  teacher: Teacher;
  constructor() { }

  getCategoryRating(category: CommentCategory) {
    const n = category.comments.length || 1;
    const rating = category.comments.reduce((acc, c) => acc + c.rating, 0)/n;
    return {category: category.category, value: rating, stars: starRating(rating)};
  }

  loadTeacher() {
    this.ratingCategories = this.courseTeacher.commentCategories.map(this.getCategoryRating);
    this.teacher = this.courseTeacher.teacher;
  }

  ngOnInit() {
    this.loadTeacher();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.courseTeacher = changes.courseTeacher.currentValue;
    this.loadTeacher();

  }

}
