import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';

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

User.findOne({email: "admin@gmail.com"})
.then(admin => {
    if (!admin) {
        User.create({
            firstname: "admin",
            lastname: "admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("admin", 10),
            roles: ["user", "admin"]
        })
    }
}).catch(err => {
    console.log(err);
})



const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', indexRouter);

export default app;