// import passport
// import user model
// import config
// import jwtstrategy

// can use a passport strategy to verify a user with JWT or another strategy to verify username and password

// SETUP OPTIONS for JWT strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: config.secret
// };


// Create JWT strategy
// const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if user ID in the payload exists in the DB, if it does call done with the user, otherwis call done without a user object

  // FindbyId in the user table
  // ex.
  // User.findById(payload.sub, (err, user) => {
  //  if(err) {
  //    return done(err, false); 
  //  }
  //  if(user) {
  //    done(null, user);
  //  } else {
  //    done(null, false);
  //  }
  // });
  // });


// Tell passport to use this strategy
// passport.use(jwtLogin);

// In authentication router file
// Import authentication controller
// Import passportService from this file
// import passport

// requireAuth = passport.authenticate('jwt', { session: false });

// On get request to root route, add requireAuth middleware

