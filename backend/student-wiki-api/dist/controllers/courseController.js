"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateCourseRoute = exports.delistFromCourseRoute = exports.enrollOnCourseRoute = exports.deleteCourseRoute = exports.updateCourseRoute = exports.createCourseRoute = exports.getCourseRoute = exports.listCoursesRoute = void 0;

var _coursesService = require("../services/coursesService");

var _authService = require("../services/authService");

var _helpers = require("./helpers");

var listCoursesRoute = function listCoursesRoute(req, res) {
  (0, _coursesService.listCourses)(res);
};

exports.listCoursesRoute = listCoursesRoute;

var getCourseRoute = function getCourseRoute(req, res) {
  if (!req.params.courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId has not been specified"
    });
  }

  (0, _coursesService.getCourse)(res, req.params.courseId);
};

exports.getCourseRoute = getCourseRoute;

var createCourseRoute = function createCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'admin')) {
    return (0, _helpers.unauthorizedUser)(res);
  }

  var _req$body = req.body,
      name = _req$body.name,
      description = _req$body.description,
      ects = _req$body.ects,
      semester = _req$body.semester,
      courseForm = _req$body.courseForm,
      maxStudents = _req$body.maxStudents,
      image = _req$body.image;

  if ([name, description, ects, semester, courseForm, maxStudents, image].some(function (el) {
    return el === undefined;
  })) {
    return res.status(400).json({
      success: false,
      message: "params are missing"
    });
  }

  (0, _coursesService.createCourse)(res, {
    name: name,
    description: description,
    ects: ects,
    semester: semester,
    courseForm: courseForm,
    maxStudents: maxStudents,
    image: image
  }, req.user);
};

exports.createCourseRoute = createCourseRoute;

var updateCourseRoute = function updateCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'admin')) {
    return res.json({
      success: false,
      message: "unauthorized user"
    });
    return (0, _helpers.unauthorizedUser)(res);
  }

  if (!req.params.courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId has not been specified"
    });
  }

  var _req$body2 = req.body,
      name = _req$body2.name,
      description = _req$body2.description,
      ects = _req$body2.ects,
      semester = _req$body2.semester,
      courseForm = _req$body2.courseForm,
      maxStudents = _req$body2.maxStudents,
      image = _req$body2.image;
  (0, _coursesService.updateCourse)(res, req.params.courseId, {
    name: name,
    description: description,
    ects: ects,
    semester: semester,
    courseForm: courseForm,
    maxStudents: maxStudents,
    image: image
  });
};

exports.updateCourseRoute = updateCourseRoute;

var deleteCourseRoute = function deleteCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'admin')) {
    return (0, _helpers.unauthorizedUser)(res);
  }

  if (!req.params.courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId has not been specified"
    });
  }

  (0, _coursesService.deleteCourse)(res, req.params.courseId);
};

exports.deleteCourseRoute = deleteCourseRoute;

var enrollOnCourseRoute = function enrollOnCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'user')) {
    return (0, _helpers.unauthorizedUser)(res);
  }

  if (!req.params.courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId has not been specified"
    });
  }

  (0, _coursesService.enrollOnCourse)(res, req.params.courseId, req.user);
};

exports.enrollOnCourseRoute = enrollOnCourseRoute;

var delistFromCourseRoute = function delistFromCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'user')) {
    return (0, _helpers.unauthorizedUser)(res);
  }

  if (!req.params.courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId has not been specified"
    });
  }

  (0, _coursesService.delistFromCourse)(res, req.params.courseId, req.user);
};

exports.delistFromCourseRoute = delistFromCourseRoute;

var rateCourseRoute = function rateCourseRoute(req, res) {
  if (!(0, _authService.isRequestAuthorized)(req, 'user')) {
    return (0, _helpers.unauthorizedUser)(res);
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

  switch (req.method) {
    case "POST":
      (0, _coursesService.rateCourse)(res, req.params.courseId, req.body.rating, req.user);
      break;

    case "PUT":
      (0, _coursesService.rateCourseUpdate)(res, req.params.courseId, req.body.rating, req.user);
      break;

    case "DELETE":
      (0, _coursesService.rateCourseDelete)(res, req.params.courseId, req.body.rating, req.user);
  }
};

exports.rateCourseRoute = rateCourseRoute;