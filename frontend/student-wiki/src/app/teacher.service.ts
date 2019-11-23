import { Injectable } from '@angular/core';
import * as Teachers from "../mocks/teachers.json";
import { Teacher } from './models/teacher.js';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teachers = (Teachers as any).dafault as Teacher[];

  constructor() { }

  getAllTeachers() {
    return of(this.teachers);
  }

  getTeacherById(id: string) {
    return of(this.teachers.find(teacher => teacher.id === id));
  }

}
