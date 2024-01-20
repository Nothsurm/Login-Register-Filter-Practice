import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js'

const app = express()

app.use(express.json())

dotenv.config()

mongoose.connect(process.env.VITE_MONGODB).then(() => {
    console.log('Connected to DB')
}).catch((err) => {
    console.log(err)
})

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

app.use('/api/auth', authRoute)