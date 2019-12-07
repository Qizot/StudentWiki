import { createCourse, deleteCourse, enrollOnCourse, rateCourse, listCourses, delistFromCourse, rateCourseDelete, rateCourseUpdate, getCourse } from "../services/coursesService";
import { isRequestAuthorized } from "../services/authService";
import { unauthorizedUser } from "./helpers";


export const listCoursesRoute = (req, res) => {
    listCourses(res);
}

export const getCourseRoute = (req, res) => {
    if (!req.params.courseId) {
        return res.status(400).json({
            success: false, 
            message: "courseId has not been specified"
        });
    }
    getCourse(res, req.params.courseId);
}

export const createCourseRoute = (req, res) => {
    if (!isRequestAuthorized(req, 'admin')) {
        return unauthorizedUser(res);
    }

    const { name, description, ects, semester, courseForm, maxStudents, image} = req.body;
    if ([name, description, ects, semester, courseForm, maxStudents, image].some(el => el === undefined)) {
        return res.status(400).json({
            success: false,
            message: "params are missing"
        });
    }
    createCourse(res, { name, description, ects, semester, courseForm, maxStudents, image}, req.user);
}

export const deleteCourseRoute = (req, res) => {
    if (!isRequestAuthorized(req, 'admin')) {
        return unauthorizedUser(res);
    }
    if (!req.params.courseId) {
        return res.status(400).json({
            success: false, 
            message: "courseId has not been specified"
        });
    }
    deleteCourse(res, req.params.courseId);
}

export const enrollOnCourseRoute = (req, res) => {
    if (!isRequestAuthorized(req, 'user')) {
        return unauthorizedUser(res);
    }
    if (!req.params.courseId) {
        return res.status(400).json({
            success: false, 
            message: "courseId has not been specified"
        });
    }

    enrollOnCourse(res, req.params.courseId, req.user);
}

export const delistFromCourseRoute = (req, res) => {
    if (!isRequestAuthorized(req, 'user')) {
        return unauthorizedUser(res);
    }
    if (!req.params.courseId) {
        return res.status(400).json({
            success: false, 
            message: "courseId has not been specified"
        });
    }

    delistFromCourse(res, req.params.courseId, req.user);
}

export const rateCourseRoute = (req, res) => {
    if (!isRequestAuthorized(req, 'user')) {
        return unauthorizedUser(res);
    }
    if (!req.params.courseId) {
        return res.status(400).json({
            success: false, 
            message: "courseId has not been specified"
        });
    }
    if (!req.body.rating) {
        return res.status(400).json({
            success: false, 
            message: "rating field is missing"
        });
    }

    switch(req.method) {
        case "POST":
            rateCourse(res, req.params.courseId, req.body.rating, req.user);
            break;
        case "PATCH":
            rateCourseUpdate(res, req.params.courseId, req.body.rating, req.user);
            break;
        case "DELETE":
            rateCourseDelete(res, req.params.courseId, req.body.rating, req.user);

    }
}