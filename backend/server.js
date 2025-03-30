require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const passport = require('passport');
require('./auth/githubAuth');  // Load GitHub Auth
require('./auth/googleAuth');  // Load Google Auth
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());




app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);


app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});
