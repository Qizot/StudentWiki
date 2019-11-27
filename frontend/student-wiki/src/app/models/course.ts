import { RatingValue } from './rating';

export enum CourseForm {
    Lecture,
    Project,
    Lab,
    Excercise
}

export interface Course {
    id: string;
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