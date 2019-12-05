import { Course } from '../models/course';


export const starRating = (stars: number) => {
    let s = "";
    const full = Math.min(Math.floor(stars-0.01) + 1, 5);
    s += "★ ".repeat(full);
    s += "☆".repeat(5 - full);
    return s;
}

export const getCourseRating = (course: Course) => {
    if (!course) return 0;
    let n = course.ratings.length || 1;
    let sum = 0;
    course.ratings.forEach(rating => sum += rating.rating);
    return sum / n;
}