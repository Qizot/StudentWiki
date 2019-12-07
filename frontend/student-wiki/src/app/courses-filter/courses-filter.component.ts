import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Range, CourseSearchConfig } from '../pipes/search-courses.pipe';
import { CourseForm } from '../models/course';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-filter',
  templateUrl: './courses-filter.component.html',
  styleUrls: ['./courses-filter.component.scss']
})
export class CoursesFilterComponent implements OnInit {


  @Output() searchConfig = new EventEmitter<CourseSearchConfig>();

  courseForms = CourseForm;

  getCourseFormKeys() {
    return Object.keys(this.courseForms).filter(k => !isNaN(parseInt(k)));
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    semester: new FormControl([1, 9]),
    maxStudents: new FormControl([1, 1000]),
    rating: new FormControl([0, 5]),
    ects: new FormControl([1, 30]),
    courseForm: new FormControl('')
  });



  semesterOptions: Options = {
    floor: 1,
    ceil: 9,
    animate: false
  };

  maxStudentsOptions: Options = {
    floor: 0,
    ceil: 1000,
    animate: false
  }

  ratingOptions: Options = {
    floor: 0,
    ceil: 5,
    animate: false,
    step: 0.01
  };

  ectsOptions: Options = {
    floor: 1,
    ceil: 30,
    animate: false
  }

  constructor() { }

  ngOnInit() {
  }

  clear() {
    this.form.reset({
      name: "",
      semester: [1, 9],
      maxStudents: [1, 1000],
      rating: [0, 5],
      ects: [1, 30],
      courseForm: ''
    });
    this.onSubmit();
  }

  onSubmit() {

    const {name, semester, rating, maxStudents, ects, courseForm} = this.form.value;

    const config: CourseSearchConfig = {
      name: this.form.value.name,
      semester: {min: semester[0], max: semester[1]},
      rating: {min: rating[0], max: rating[1]},
      maxStudents: {min: maxStudents[0], max: maxStudents[1]},
      ects: {min: ects[0], max: ects[1]},
      courseForm
    }
    this.searchConfig.emit(config);
  }

}
