import jwt from 'jsonwebtoken';
import db from '../../database/dbConfig';
import passport from 'passport';
require('dotenv').config();

// jwt
import { ExtractJwt } from 'passport-jwt';

// local
//const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

// facebook
//const FacebookStrategy = require('passport-facebook').Strategy;

//const User = require('../models/user');

const secret = process.env.SECRET || 'No secret set';
const ENVIRONMENT = process.env.ENVIRONMENT;

// local strategy/
/*
const local_strategy = new LocalStrategy(async (email, password, done) => {
  try {
    // get a user using the username
    const found = await db("users").where({ email });
    if (found.length > 0) {
      // if a user is found, verify password
      const valid = await found.check_password(password);

      return valid
        ? done(null, found) // Return found user if PW is a match
        : done(null, false, { message: 'Incorrect credentials.' });
    }
    // username not found
    else return done(null, false, { message: 'Incorrect credentials.' });
  } catch (err) {
    if (ENVIRONMENT) console.log(err);
    return done(null, false, { message: 'Internal Error.' });
  }
}); // end of local stragey
passport.use(local_strategy); // using local strategy
*/
// Jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwt_strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find a user using the info encoded in the JWT payload
    const queryResults = await db("users").where({id: payload.sub});
    const found = queryResults.length > 0 ? true : false;
    // If a user was found return it, else return false
    return found ? done(null, found) : done(null, false);
  } catch (err) {
    if (ENVIRONMENT) console.log(err);
    return done(null, false, { message: 'Internal Error.' });
  }
}); // end of jwt strategy

passport.use(jwt_strategy); // using the jwt strategy

// session is false so we can use jwt
const authenticate = passport.authenticate('local', { session: false });
const protectedRoute = passport.authenticate('jwt', { session: false });

export default { authenticate, protectedRoute };