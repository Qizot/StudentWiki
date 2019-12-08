import { Injectable } from '@angular/core';
import { Course, AddCourse } from '../models/course';
import { RatingValue } from '../models/rating.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const DOMAIN = environment.domain;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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

  deleteCourse(courseId: string, headers: HttpHeaders) {
    return this.httpClient.delete(DOMAIN + `/courses/${courseId}`, {headers});
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
