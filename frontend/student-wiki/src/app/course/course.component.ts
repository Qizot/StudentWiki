import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../models/course';
import { starRating, getCourseRating } from '../helpers/helpers';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  course: Course;
  currentRating: number;

  constructor(
    private router: ActivatedRoute,
    private courseService: CourseService
  ) { }

  getCourse() {
    const id = this.router.snapshot.paramMap.get("id");
    this.courseService.getCourseById(id).subscribe(c =>  {
      this.course = c;
      this.currentRating = this.getCurrentRating();
    });
  }

  getCurrentRating() {
    return getCourseRating(this.course);
  }

  getStars() {
    return starRating(this.currentRating);
  }

  ngOnInit() {
    this.getCourse();
  }

}