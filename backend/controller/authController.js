import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../middleware/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'Please fill in all the inputs'))
    }

    if (username && username.length < 5) {
        next(errorHandler(400, 'Please use more than 7 characters for your username'))
    }
    if (password && password.length < 5) {
        next(errorHandler(400, 'Please use more than 7 characters for your password'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        res.json('Signup successfull')
    } catch (error) {
        next(error)
    }
}