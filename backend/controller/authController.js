import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        res.send('Please fill all inputs')
    }

    if (username && username.length < 5) {
        res.send('Please use more than 7 characters for your username')
    }
    if (password && password.length < 5) {
        res.send('Please use more than 7 characters for your password')
    }

    const newUser = new User({
        username,
        email,
        password
    })

    try {
        await newUser.save()
        res.json('Signup successfull')
    } catch (error) {
        console.log(error)
    }
}