import { createCourse } from "../services/coursesService";


export const createCourseRoute = (req, res) => {
    if (!req.user || !(req.user.roles && req.user.roles.contains('admin'))) {
        return res.staus(401).json({
            success: false,
            message: "unauthorized user"
        });
    }

    const { name, descrioption, ects, semester, courseForm, maxStudents} = req.body;
    if ([name, descrioption, ects, semester, courseForm, maxStudents].some(el => el === undefined)) {
        return res.status(400).json({
            success: false,
            message: "params are missing"
        });
    }
    createCourse(res, req.body, req.user);
}

export const deleteCourseRoute = (req, res) => {
    if (!req.user || !(req.user.roles && req.user.roles.contains('admin'))) {
        
    }
}