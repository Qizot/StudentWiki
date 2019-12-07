import express from 'express';
import {loginRoute, registerRoute, meRoute} from '../controllers/userController';
import {createCourseRoute, deleteCourseRoute, enrollOnCourseRoute, rateCourseRoute, listCoursesRoute, delistFromCourseRoute, getCourseRoute} from '../controllers/courseController';
import checkToken from '../middleware/auth';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// users
router.post('/login', loginRoute);
router.post('/register', registerRoute);
router.get('/me', checkToken, meRoute)

// courses
router.get('/courses', listCoursesRoute);
router.get('/courses/:courseId', getCourseRoute);
router.post('/courses', checkToken, createCourseRoute);
router.delete('/courses/:courseId', checkToken, deleteCourseRoute);
router.post('/courses/:courseId/enroll', checkToken, enrollOnCourseRoute);
router.post('/courses/:courseId/delist', checkToken, delistFromCourseRoute);
router.post('/courses/:courseId/rate', checkToken, rateCourseRoute);
router.put('/courses/:courseId/rate', checkToken, rateCourseRoute);
router.delete('/courses/:courseId/rate', checkToken, rateCourseRoute);



export default router;