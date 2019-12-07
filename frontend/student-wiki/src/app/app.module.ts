import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { RegisterComponent } from './register/register.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseComponent } from './course/course.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RateCourseComponent } from './rate-course/rate-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCourseComponent } from './add-course/add-course.component';
import { SearchCoursesPipe } from './pipes/search-courses.pipe';
import { CoursesFilterComponent } from './courses-filter/courses-filter.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavbarComponent,
      HomeComponent,
      HomeLayoutComponent,
      LoginLayoutComponent,
      RegisterComponent,
      CourseListComponent,
      CourseCardComponent,
      CourseComponent,
      RateCourseComponent,
      AddCourseComponent,
      SearchCoursesPipe,
      CoursesFilterComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      NgbModule,
      BrowserAnimationsModule,
      MatSnackBarModule,
      Ng5SliderModule,
      HttpClientModule
   ],
   providers: [
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
