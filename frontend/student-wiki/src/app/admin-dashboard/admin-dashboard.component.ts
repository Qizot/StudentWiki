import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseSearchConfig } from '../pipes/search-courses.pipe';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  courses: Course[]
  searchConfig: Partial < CourseSearchConfig > = {};

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCourses();
  }

  

  setSearchConfig(config: CourseSearchConfig) {
    this.searchConfig = config;
  }
  getCourses() {
    this.courseService.getAllCourses().subscribe(cs => {
      this.courses = cs;
    });
  }

}
