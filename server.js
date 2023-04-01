// import cors from 'cors'
import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config()

import 'express-async-errors'
import morgan from 'morgan';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// db and auth user
import connectDB from './db/connect.js';

// router
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'



// const __dirname = dirname(fileURLToPath(import.meta.url));

// // only when ready to deploy
// app.use(express.static(path.resolve(__dirname, './client/build')));

// // routes
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// // only when ready to deploy
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });


// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
// app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg: 'Welcome!'})
});

app.get('/api/v1', (req, res) => {
    res.json({msg: 'API!'})
});

app.use('/api/v1/auth', authRouter)
// app.use('/api/v1/jobs', jobsRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4001;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}`)
        });        
    } catch (error) {
        console.log(error)
    };
}

start();
