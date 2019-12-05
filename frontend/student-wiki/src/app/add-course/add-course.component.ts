import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {CourseForm, AddCourse} from '../models/course';
import { formatNumber } from '@angular/common';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempted: boolean = false;

  courseForms = CourseForm;

  getCourseFormKeys() {
    return Object.keys(this.courseForms).filter(k => !isNaN(parseInt(k)));
  }



  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      ects: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      courseForm: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      image: ['', [Validators.required, Validators.pattern(/https?:[/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g)]]
    });
  }

  isFieldInvalid(fieldName: string) {
    const field = this.form.get(fieldName);
    if (!field) {
      return this.formSubmitAttempted;
    }

    return (!field.valid && field.touched) ||
      (field.untouched && this.formSubmitAttempted);
  }

  getErrorMessage(field: string) {
    const messages = {
      courseName: "Please eneter course name",
      description: "Please enter description",
      semester: "Please choose semster",
      ects: "Please enter correct number of ECTS points",
      courseForm: "Please choose course form",
      maxStudents: "Please specify maximum number of students allowed"
    }

    return messages[field];
  }

  submitAttempted() {
    return this.formSubmitAttempted;
  }

  onSubmit() {
    this.formSubmitAttempted = true;
    if (this.form.valid) {
      this.courseService.addCourse({...this.form.value, name: this.form.value.courseName});
      this.router.navigate(["/courses"]);
    }
  }

}
