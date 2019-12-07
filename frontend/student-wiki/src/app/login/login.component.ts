import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ServiceMessage } from '../helpers/service-message';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  errorMessage: ServiceMessage = null;
  errorMessage$: Subscription;
  isLoggedIn$: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.errorMessage$ = this.authService.loginError.subscribe(msg => {
      this.errorMessage = msg;
    });
    this.isLoggedIn$ = this.authService.isLoggedIn.subscribe(isLogged => {
      if (isLogged) {
        this.router.navigate(["/home"]);
      }
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.errorMessage$.unsubscribe();
    this.isLoggedIn$.unsubscribe();
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
      email: "Please enter your email",
      password: "Please enter your password"
    }

    return messages[field];
  }

  submitAttempted() {
    return this.formSubmitAttempt;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value); // {7}
    }
    this.formSubmitAttempt = true;             // {8}
  }
}
