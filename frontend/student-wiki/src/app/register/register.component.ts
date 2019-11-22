import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) { // {6}
    const isValid = (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
    return isValid;
  }

  getErrorMessage(field: string) {
    const messages = {
      email: "Please enter email with valid format",
      password: "Please enter your password",
      verifyPassword: "Passwords must match",
      firstname: "Please eneter your name",
      lastname: "Please eneter your last name",
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
