import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as StudentsFile from "../mocks/students.json";
import { Student } from '../models/studnet.js';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students = (StudentsFile as any).default as Student[];

  getAllStudents() {
    return of(this.students);
  }

  getStudentById(id: string) {
    let student = this.students.find(s => s.id === id); 
    return of(student);
  }
}
