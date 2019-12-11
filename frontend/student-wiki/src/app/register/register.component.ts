import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ServiceMessage } from '../helpers/service-message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}
  errorMessage: ServiceMessage;
  errorMessage$: Subscription;

  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService // {4}
  ) {}


  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}

  ngOnInit() {
    this.errorMessage$ = this.authService.loginError.subscribe(err => this.errorMessage = err);
    
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  ngOnDestroy() {
    this.errorMessage$.unsubscribe();
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
      password: this.form.value.password.length < 6 ? "Password must have at least 6 characters" : "Please enter your password",
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
