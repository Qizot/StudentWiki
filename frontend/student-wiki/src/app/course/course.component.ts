import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../models/course';
import { starRating } from '../helpers/start-rating';
import { CourseTeacher, CommentCategory } from '../models/teacher';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  course: Course;
  currentRating: number;
  courseTeachers: CourseTeacher[];

  currentTeacher: CourseTeacher;

  constructor(
    private router: ActivatedRoute,
    private courseService: CourseService
  ) { }

  getCourse() {
    const id = this.router.snapshot.paramMap.get("id");
    this.courseService.getCourseById(id).subscribe(c =>  {
      this.course = c;
      this.currentRating = this.getCurrentRating();
      this.courseTeachers = this.course.courseTeachers;
      this.currentTeacher = this.courseTeachers[0] || null;
    });
  }

  setCurrentTeacher(id: string) {
    console.log("changing teacher");
    this.currentTeacher = this.courseTeachers.find(ct => ct.teacher.id === id) || null;
  }

  getCurrentRating() {
    let n = this.course.ratings.length;
    let sum = 0;
    this.course.ratings.forEach(rating => sum += rating.rating);
    return sum / n;
  }

  getStars() {
    return starRating(this.currentRating);
  }

  ngOnInit() {
    this.getCourse();

  }

}