import { Strategy as LocalStrategy } from "passport-local";
import User from "./model/user.js";
export const initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {


      try {
        const user = await User.findOne({ username: username });

        if (!user) return done(null, false); // first is for error if not error then null. false because there is no user so false

        if (user.password !== password) return done(null, false);

        return done(null, user);
        


      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user,done)=> {
    done(null, user.id);
  })
  passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null,user)
    } catch (error) {
        done(error,false)
    }
  });
};

export const isAuthenticated = (request, response, next) => {

    if(request.user) return next();

    response.redirect('/login');

}
