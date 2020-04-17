require('dotenv').config();
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('../models/auth-model'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) =>{
            
        },//end (username, password, done) callback
    ),//end new localStrategy
);//end passport.use