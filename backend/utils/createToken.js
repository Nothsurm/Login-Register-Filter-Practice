import jwt from "jsonwebtoken";

export const generateToken = (res, userId, next) => {
    const token = jwt.sign({userId}, process.env.VITE_JWT_SECRET, {expiresIn: '30d'});

    if (!token) {
        return next(errorHandler(400, 'Unauthorized'))
    }

    //Set JWT as an http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.VITE_NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 30* 24 * 60 * 60 * 1000
    })

    return token
};