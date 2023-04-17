const express = require('express');
const App = express();
const cors = require('cors');
require('dotenv').config();
const corsOptions= require('./config/corsOptions')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const refreshRouter= require('./routes/refresh')
const problemRouter = require("./routes/problem");
const submitRouter = require('./routes/submission')
const postRouter = require('./routes/post')
const profileRouter= require('./routes/profile')
const memberRouter= require('./routes/members')
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const isActive = require('./middleware/isActive');
connectDB();

App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(cors(corsOptions));
App.use('/signup', registerRouter);
App.use('/login', loginRouter);
App.use('/refresh', refreshRouter);
App.use('/api/problems', problemRouter);
App.use('/api/submit', submitRouter);
App.use('/profile', profileRouter);
App.use(verifyJWT);
App.use(isActive);
App.use('/api/members', memberRouter)
App.use('/api/post', postRouter)

mongoose.connection.once('open', () => {
    console.log('Connected To MONGODB');
    App.listen(PORT, () => {
        console.log('Listening on Port ', PORT)
    })
})


