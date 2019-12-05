import { Pipe, PipeTransform } from '@angular/core';
import { CourseForm, Course } from '../models/course';
import { getCourseRating } from '../helpers/helpers';

export interface Range {
  min: number;
  max: number;
}

export interface CourseSearchConfig {
  name: string;
  semester: Range;
  maxStudents: Range;
  rating: Range;
  ects: Range;
  courseForm: CourseForm;
}

@Pipe({
  name: 'searchCourses'
})
export class SearchCoursesPipe implements PipeTransform {

  

  transform(courses: Course[], config: Partial<CourseSearchConfig>): Course[] {
    const isBetween = (num: number, range: Range) => 
      range.min <= num && num <= range.max;

    if (config.name) {
      courses = courses.filter(course => course.name.toLowerCase().includes(config.name.toLowerCase()));
    }
    if (config.semester) {
      courses = courses.filter(course => isBetween(course.semester, config.semester));
    }
    if (config.maxStudents) {
      courses = courses.filter(course => isBetween(course.maxStudents, config.maxStudents));
    }
    if (config.rating) {
      courses = courses.filter(course => isBetween(getCourseRating(course), config.rating));
    }
    if (config.ects) {
      courses = courses.filter(course => isBetween(course.ects, config.ects));
    }
    if (config.courseForm) {
      courses = courses.filter(course => course.courseForm === config.courseForm);
    }
    return courses;
  }

}
