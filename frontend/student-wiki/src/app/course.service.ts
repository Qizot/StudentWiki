import { Injectable } from '@angular/core';
import * as Courses from "../mocks/courses.json";
import { Course } from './models/course';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses = (Courses as any).default as Course[];

  constructor() {
  }

  getAllCourses() {
    return of(this.courses);
  }

  getCourseById(id: string) {
    console.log(this.courses.find(course => course.id === id));
    return of(this.courses.find(course => course.id === id));
  }

  addCourse(course: Course) {
    this.courses.push(course);
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
