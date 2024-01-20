import User from "../models/userModel.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

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