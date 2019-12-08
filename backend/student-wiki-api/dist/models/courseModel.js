"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var courseSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    validate: {
      validator: function validator(v) {
        return /https?:[/|.|\w|\s|-]*\.(?:jpg|gif|png|jpeg).*/g.test(v);
      },
      message: "invalid image format"
    },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ects: {
    type: Number,
    min: 1,
    max: 30,
    required: true
  },
  semester: {
    type: Number,
    min: 1,
    max: 9,
    required: true
  },
  courseForm: {
    type: String,
    "enum": ["Lecture", "Project", "Lab", "Excercise"],
    required: true
  },
  maxStudents: {
    type: Number,
    required: true
  },
  ratings: [{
    studentId: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  }],
  enrolledStudents: [{
    type: String
  }]
});

var Course = _mongoose["default"].model('Course', courseSchema);

var _default = Course;
exports["default"] = _default;