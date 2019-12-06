import { loginUser, registerUser } from '../services/authService';


export const loginRoute = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: "both email and password must be specified"
        });
        return;
    }
    loginUser(res, {email, password});
   
}

export const registerRoute = (req, res) => {
    const params = req.body;
    const {firstname, lastname, email, password} = params;
    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({
            success: false,
            message: "params are misssing"
        });
        return;
    }
    registerUser(res, params);
}

export const meRoute = (req, res) => {
    if (!req.user) {
        return res.status(500).json({
            success: false,
            message: "user has not been found, this is server error as the middleware should catch it"
        });
    }
    return res.json(req.user);
}