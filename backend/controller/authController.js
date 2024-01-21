import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
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

    const hashedPassword = bcrypt.hashSync(password, 10)

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

export const signin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'Please fill in all the inputs'))
    }

    if (password && password.length < 5) {
        next(errorHandler(400, 'Your password must contain more than 5 characters'))
    }

    const existingUser = await User.findOne({email})

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            next(errorHandler(400, 'Incorrect password, please try again'))
        } else {
            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username, 
                email: existingUser.email, 
            })
        }
    }
}