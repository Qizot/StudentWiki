import express from 'express';
import {loginRoute, registerRoute, meRoute} from '../controllers/userController';
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



export default router;