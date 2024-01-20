import express from 'express';
import authRoute from './routes/authRoute.js'

const app = express()

app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})

app.use('/api/auth', authRoute)