import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import userService from '../services/user.service.js';

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// authentication with access token
passport.use(new JwtStrategy(jwtStrategyOpts, async (jwtPayload, done) => {
  try {
    const user = await userService.getUserById(jwtPayload.id);
    if (user) {
      // note: don't need to check password
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;