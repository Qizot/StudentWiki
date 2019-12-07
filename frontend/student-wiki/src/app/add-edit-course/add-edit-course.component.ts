import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {CourseForm } from '../models/course';
import { CourseService } from '../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { displaySnackbar } from '../helpers/snackbar';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempted: boolean = false;
  editMode: boolean = false;

  courseForms = CourseForm;

  getCourseFormKeys() {
    return Object.keys(this.courseForms).filter(k => !isNaN(parseInt(k)));
  }

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.form = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      ects: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      courseForm: ['', Validators.required],
      maxStudents: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      image: ['', [Validators.required, Validators.pattern("https?:[/|.|\\w|\\s|-]*\\.(?:jpg|gif|png|jpeg).*")]]
    });

    
    if (this.router.url.includes("edit")) {
      this.editMode = true;

      const id = this.route.snapshot.paramMap.get("id");
      this.courseService.getCourseById(id).subscribe(
        course => {
          this.form.patchValue({
            courseName: course.name,
            description: course.description,
            semester: course.semester,
            ects: course.ects,
            courseForm: course.courseForm,
            maxStudents: course.maxStudents,
            image: course.image
          });
        },
        ({error}) =>
          displaySnackbar({success: false, message: "error while fetching course from remote server: " + error.message}, this.snackbar)
      );
    }
  
  }

  isFieldInvalid(fieldName: string) {
    const field = this.form.get(fieldName);
    if (!field) {
      return this.formSubmitAttempted;
    }

    return (!field.valid && (field.touched && !this.editMode)) ||
      ((field.untouched &&  !this.editMode) && this.formSubmitAttempted);
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
    if (this.form.valid && !this.editMode) {
      this.courseService.addCourse(
        {
          ...this.form.value, 
          name: this.form.value.courseName
        }, 
        this.authService.headers
      ).subscribe(
        result => {
          displaySnackbar({success: true, message: "New course has been created"}, this.snackbar);
          this.router.navigate(["/courses"]);
        },
        ({error}) => {
          displaySnackbar({success: false, message: "Encountered an error: " + error.message}, this.snackbar);
        },
        () => console.log("finished adding new course")
      );
    } else if (this.form.valid && this.editMode) {
      const id = this.route.snapshot.paramMap.get("id");

      this.courseService.updateCourse(
        id,
        {
          ...this.form.value, 
          name: this.form.value.courseName
        }, 
        this.authService.headers
      ).subscribe(
        result => {
          displaySnackbar({success: true, message: "Course has been updated"}, this.snackbar);
          this.router.navigate(["/courses"]);
        },
        ({error}) => {
          displaySnackbar({success: false, message: "Encountered an error: " + error.message}, this.snackbar);
        },
        () => console.log("finished updating course")
      );
    } else {
      displaySnackbar({success: false, message: "Invalid form"}, this.snackbar);
    }
  }

}
