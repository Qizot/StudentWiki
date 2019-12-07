import { Injectable } from '@angular/core';
import * as Courses from '../../mocks/courses.json';
import { Course, AddCourse } from '../models/course';
import { of } from 'rxjs';
import { User } from '../models/user.js';
import { RatingValue } from '../models/rating.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOMAIN } from '../config.js';
import { take, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses = (Courses as any).default as Course[];

  constructor(private httpClient: HttpClient) {
  }

  getAllCourses() {
    return this.httpClient.get<Course[]>(DOMAIN + '/courses');
  }

  getCourseById(id: string) {
    return this.httpClient.get<Course>(DOMAIN + `/courses/${id}`);
  }

  addCourse(course: AddCourse, headers: HttpHeaders) {
    return this.httpClient.post(DOMAIN + "/courses", course, {headers});
  }

  updateCourse(courseId: string, course: AddCourse, headers: HttpHeaders) {
    return this.httpClient.patch(DOMAIN + `/courses/${courseId}`, course, {headers});
  }

  deleteCourse(id: string) {
    this.courses = this.courses.filter(course => course._id !== id);
  }

  enrollOnCourse(courseId: string, headers: HttpHeaders) {
    return this.httpClient.post(DOMAIN + `/courses/${courseId}/enroll`, null, {headers});
  }

  delistFromCourse(courseId: string, headers: HttpHeaders) {
    return this.httpClient.post(DOMAIN + `/courses/${courseId}/delist`, null, {headers});
  }

  rateCourse(courseId: string, headers: HttpHeaders, rating: RatingValue) {
    return this.httpClient.post(DOMAIN + `/courses/${courseId}/rate`, {rating}, {headers});
  }

  updateCourseRating(courseId: string, headers: HttpHeaders, rating: RatingValue) {
    return this.httpClient.put(DOMAIN + `/courses/${courseId}/rate`, {rating}, {headers});
  }


}
