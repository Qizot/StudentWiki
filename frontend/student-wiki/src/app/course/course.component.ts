import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  course: Course;

  constructor(
    private router: ActivatedRoute,
    private courseService: CourseService
  ) { }

  getTeachers() {
    if (!this.course) return [];
    return this.course.courseTeachers.map(teacher => teacher.teacher);
  }

  getCourse() {
    const id = this.router.snapshot.paramMap.get("id");
    this.courseService.getCourseById(id).subscribe(c => this.course = c);
  }

  ngOnInit() {
    this.getCourse();
  }

}