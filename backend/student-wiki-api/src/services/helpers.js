import jwt from 'jsonwebtoken';
import config from '../config/config';

export const createToken = (secureUser) => {
    return jwt.sign(secureUser,
        config.secret,
        { expiresIn: '24h'}
    );
}

export const getUserFromToken = (token) => {
    try {
        const user = jwt.verify(token, config.secret);
        return user;
    } catch(err) {
        return null;
    }
}