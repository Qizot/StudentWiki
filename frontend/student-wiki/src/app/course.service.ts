import { Injectable } from '@angular/core';
import * as Courses from "../mocks/courses.json";
import { Course, AddCourse } from './models/course';
import { of } from 'rxjs';
import { User } from './models/user.js';
import { RatingValue } from './models/rating.js';
import {MatSnackBar} from '@angular/material/snack-bar';


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

  addCourse(course: AddCourse) {
    const properCourse: Course = {...course, id: course.name, ratings: [], enrolledStudents: []};
    this.courses.push(properCourse);
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  rateCourse(courseId: string, user: User, rating: RatingValue) {
    const course = this.courses.find(course => course.id === courseId);
    if (!course) {
      return {success: false, message: "Course has not been found"};
    }
    if (!user) {
      return {success: false, message: "User is not logged in"};
    }
    course.ratings.push({studentId: user.id, rating});
    return {success: true, message: "Rating addeds successfully"};
  }
}
