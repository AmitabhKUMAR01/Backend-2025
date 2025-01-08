import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import jobRouter from './routes/job.routes.js';
import jobDescriptionRouter from './routes/jobDescription.routes.js';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/job-descriptions", jobDescriptionRouter)

export { app }
