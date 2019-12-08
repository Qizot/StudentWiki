"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controllers/userController");

var _courseController = require("../controllers/courseController");

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
}); // users

router.post('/login', _userController.loginRoute);
router.post('/register', _userController.registerRoute);
router.get('/me', _auth["default"], _userController.meRoute); // courses

router.get('/courses', _courseController.listCoursesRoute);
router.post('/courses', _auth["default"], _courseController.createCourseRoute);
router.get('/courses/:courseId', _courseController.getCourseRoute);
router.patch('/courses/:courseId', _auth["default"], _courseController.updateCourseRoute);
router["delete"]('/courses/:courseId', _auth["default"], _courseController.deleteCourseRoute);
router.post('/courses/:courseId/enroll', _auth["default"], _courseController.enrollOnCourseRoute);
router.post('/courses/:courseId/delist', _auth["default"], _courseController.delistFromCourseRoute);
router.post('/courses/:courseId/rate', _auth["default"], _courseController.rateCourseRoute);
router.put('/courses/:courseId/rate', _auth["default"], _courseController.rateCourseRoute);
router["delete"]('/courses/:courseId/rate', _auth["default"], _courseController.rateCourseRoute);
var _default = router;
exports["default"] = _default;