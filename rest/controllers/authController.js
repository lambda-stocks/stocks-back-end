import db from '../../database/dbConfig';
import passport from 'passport';
require('dotenv').config();

// jwt
import { ExtractJwt } from 'passport-jwt';

const JwtStrategy = require('passport-jwt').Strategy;


const secret = process.env.SECRET || 'No secret set';
const ENVIRONMENT = process.env.ENVIRONMENT;

// Jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwt_strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find a user using the info encoded in the JWT payload
    const queryResults = await db("users").where({id: payload.subject});

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
const protectedRoute = passport.authenticate('jwt', { session: false });

export default { protectedRoute };