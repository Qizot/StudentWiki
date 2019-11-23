import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models/course';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../course.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  @Input() displayCard: boolean = false;

  currentRating: number;
  commentsCount: number;

  constructor(
    private router: ActivatedRoute,
    private courseService: CourseService
    ) { }

  getTeachers() {
    if (!this.course) return [];
    return this.course.courseTeachers.map(teacher => teacher.teacher);
  }

  getCurrentRating() {
    let n = this.course.ratings.length;
    let sum = 0;
    this.course.ratings.forEach(rating => sum += rating.rating);
    return sum / n;
  }

  // getCommentCount() {
  //   return this.course.courseTeachers.reduce((acc, ct) => acc + ct.commentCategories)
  // }

  ngOnInit() {
    if (!this.course) {
      const id = this.router.snapshot.paramMap.get("id");
      this.courseService.getCourseById(id).subscribe(c => this.course = c);
    }

    this.currentRating = this.getCurrentRating();

  }

}
