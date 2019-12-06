import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { createToken } from './helpers';

export const loginUser = (res, {email, password}) => {

    let hash = bcrypt.hashSync(password, 10);

    User.findOne({email: email}, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                success: false,
                message: "account has not been found"
            });
        }

        if (!bcrypt.compareSync(password, hash)) {
            return res.status(401).json({
                success: false,
                message: "invalid password"
            });
        }

        const secureUser = user.getSecureUser();

        return res.status(200).json({
            success: true,
            message: "successfully loged in",
            token: createToken(secureUser)
        });
    });
}

export const registerUser = (res, {email, firstname, lastname, password}) => {
    const hash = bcrypt.hashSync(password, 10);

    User.create({email, firstname, lastname, password: hash})
    .then(user => {
        return res.status(200).json({
            success: true,
            message: "account has been created"
        });
    })
    .catch(err => {
        const errMsg = err.code === 11000 ? "email is not unique" : "failed to create account";
        return es.status(400).json({
            success: false,
            message: errMsg
        })
    });
}