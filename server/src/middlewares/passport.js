// import passport from 'passport';
// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// import userService from '../services/user.service.js';

// //#region JWT Strategy -------------------------------------------------------------------------------
// const jwtStrategyOpts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// // authentication with access token
// passport.use(new JwtStrategy(jwtStrategyOpts, async (jwtPayload, done) => {
//   try {
//     const user = await userService.getUserById(jwtPayload.id);
//     if (user) {
//       // note: don't need to check password
//       return done(null, user);
//     }
//     return done(null, false);
//   } catch (error) {
//     return done(error, false);
//   }
// }));
// //#endregion ----------------------------------------------------------------------------------------

// //#region Google Strategy ----------------------------------------------------------------------------
// const googleStrategyOpts = {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
//   passReqToCallback: true
// };

// passport.use(new GoogleStrategy(googleStrategyOpts,
//   async (request, accessToken, refreshToken, profile, done) => {
//     console.log('accessToken', accessToken);
//     console.log('refreshToken', refreshToken);
//     console.log('profile', profile);

//     return done(null, profile);
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return done(err, user);
//     // });
//   }
// ));
// //#endregion ----------------------------------------------------------------------------------------

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });




// export default passport;