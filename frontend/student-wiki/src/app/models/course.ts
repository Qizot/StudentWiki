import { RatingValue } from './rating';

export enum CourseForm {
    Lecture,
    Project,
    Lab,
    Excercise
}

export interface Course {
    _id: string;
    name: string;
    image: string;
    description: string;
    ects: number;
    semester: number;
    courseForm: CourseForm;
    maxStudents: number;
    ratings: CourseRating[];
    enrolledStudents: string[];
}

export interface CourseRating {
    rating: RatingValue;
    studentId: string;
}

export interface AddCourse {
    name: string;
    description: string;
    image: string;
    semester: number;
    ects: number;
    courseForm: CourseForm;
    maxStudents: number;
}