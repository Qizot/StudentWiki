import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../models/course';
import { CourseSearchConfig } from '../pipes/search-courses.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courses: Course[]
  searchConfig: Partial<CourseSearchConfig> = {};

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe(cs => {
      this.courses = cs;
    });
  }



}
