"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateCourseDelete = exports.rateCourseUpdate = exports.rateCourse = exports.delistFromCourse = exports.enrollOnCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourse = exports.listCourses = void 0;

var _courseModel = _interopRequireDefault(require("../models/courseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var listCourses = function listCourses(res) {
  _courseModel["default"].find().then(function (courses) {
    return res.json(courses);
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch courses: " + err.errmsg
    });
  });
};

exports.listCourses = listCourses;

var getCourse = function getCourse(res, courseId) {
  _courseModel["default"].findOne({
    _id: courseId
  }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course has not been found"
      });
    }

    return res.json(course);
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch course: " + err.errmsg
    });
  });
}; // requires admin role


exports.getCourse = getCourse;

var createCourse = function createCourse(res, params) {
  _courseModel["default"].create(params).then(function (course) {
    return res.json({
      success: true,
      message: "course has been created",
      courseId: course._id
    });
  })["catch"](function (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "invalid data format, make sure to match requirements: " + err.errmsg
    });
  });
};

exports.createCourse = createCourse;

var updateCourse = function updateCourse(res, courseId, params) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId
  }, {
    $set: params
  }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course has not been found"
      });
    }

    return res.json({
      success: true,
      message: "course has been updated"
    });
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      message: "failed to update course: " + err.errmsg
    });
  });
};

exports.updateCourse = updateCourse;

var deleteCourse = function deleteCourse(res, courseId) {
  _courseModel["default"].findOneAndRemove({
    _id: courseId
  }).exec(function (err, course) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "failed to delete course"
      });
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course has not been found"
      });
    }

    return res.json({
      success: true,
      message: "course has been deleted"
    });
  });
};

exports.deleteCourse = deleteCourse;

var enrollOnCourse = function enrollOnCourse(res, courseId, secureUser) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId
  }, {
    $addToSet: {
      enrolledStudents: secureUser.id
    }
  }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course has not been found"
      });
    }

    return res.json({
      success: true,
      message: "enrolled student on a course"
    });
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      message: "failed to enroll student on a course"
    });
  });
};

exports.enrollOnCourse = enrollOnCourse;

var delistFromCourse = function delistFromCourse(res, courseId, secureUser) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId,
    enrolledStudents: secureUser.id
  }, {
    $pull: {
      enrolledStudents: secureUser.id,
      ratings: {
        studentId: secureUser.id
      }
    }
  }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "student has not been enrolled on given course"
      });
    }

    return res.json({
      success: true,
      message: "delisted student from course"
    });
  })["catch"](function (err) {
    return res.status(500).json({
      success: false,
      message: "failed to delist student on a course"
    });
  });
};

exports.delistFromCourse = delistFromCourse;

var rateCourse = function rateCourse(res, courseId, rating, secureUser) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId,
    "ratings.studentId": {
      $nin: [secureUser.id]
    }
  }, {
    $push: {
      ratings: {
        studentId: secureUser.id,
        rating: rating
      }
    }
  }).then(function (course) {
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "student must be enrolled on a course and can rate it only once"
      });
    }

    return res.json({
      success: true,
      message: "course has been rated"
    });
  })["catch"](function (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "could not rate course: " + err.errmsg
    });
  });
};

exports.rateCourse = rateCourse;

var rateCourseUpdate = function rateCourseUpdate(res, courseId, rating, secureUser) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId,
    "ratings.studentId": {
      $in: [secureUser.id]
    }
  }, {
    $set: {
      "ratings.$.rating": rating
    }
  }).then(function (course) {
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "student rating has not been found"
      });
    }

    return res.json({
      success: true,
      message: "course rate has been updated"
    });
  })["catch"](function (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "could not update course rating " + err.errmsg
    });
  });
};

exports.rateCourseUpdate = rateCourseUpdate;

var rateCourseDelete = function rateCourseDelete(res, courseId, secureUser) {
  _courseModel["default"].findOneAndUpdate({
    _id: courseId,
    "ratings.studentId": {
      $in: [secureUser.id]
    }
  }, {
    $pull: {
      "ratings.studentId": {
        $in: [secureUser.id]
      }
    }
  }).then(function (course) {
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "student rating has not been found"
      });
    }

    return res.json({
      success: true,
      message: "course rate has been deleted"
    });
  })["catch"](function (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "could not delete course rating " + err.errmsg
    });
  });
};

exports.rateCourseDelete = rateCourseDelete;