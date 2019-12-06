import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from 'mongoose';

import User from './models/userModel';

mongoose.connect('mongodb://localhost/student_wiki', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

let me = new User({
    firstname: "jakub",
    lastname: "perzylo",
    email: "ukilol@interia.pl",
    password: "dupa"
});



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', indexRouter);

export default app;