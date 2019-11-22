import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { RatingValue } from './rating';

export interface CourseTeacher {
    teacher: Teacher;
    commentCategories: CommentCategory[];
}

export interface Teacher {
    id: string;
    name: string;
    degree: string;
    image: string;
    card: TeacherCard;
}

export interface TeacherCard {
    phone: string;
    email: string;
    homePage: string;
}

export interface CommentCategory {
    category: string;
    comments: Comment[];
}

export interface Comment {
    content: string;
    rating: RatingValue;
    studentId: string;
}