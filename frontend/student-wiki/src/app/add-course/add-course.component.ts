import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean = false;


  constructor(
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      ects: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      courseForm: ['', Validators.required],
      maxSutdents: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      image: ['', [Validators.required, Validators.pattern(/https?:[/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g)]]
    });
  }

  isFieldInvalid(field: string) {
  const isValid = (
    (!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt)
  );
  return isValid;
}

getErrorMessage(field: string) {
  const messages = {
    courseName: "Please eneter course name",
    description: "Please enter description",
    semester: "Please choose semster",
    ects: "Please enter correct number of ECTS points",
    courseForm: "Please choose course form",
    maxSutdents: "Please specify maximum number of students allowed"
  }

  return messages[field];
}

submitAttempted() {
  return this.formSubmitAttempt;
}

onSubmit() {
  if (this.form.valid) {
    if (this.form.controls.password.value !== this.form.controls.verifyPassword.value) {
      this.form.controls.verifyPassword.setErrors({'incorrect': true});
    } else {
      this.authService.register(this.form.value);
    }
  }
  this.formSubmitAttempt = true;
}

}
