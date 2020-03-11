import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';

import { User, UserDocument } from '../models/user';
import { Request, Response, NextFunction } from 'express';

const localStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
      if (err) return done(err);
      if (!user) {
        return done(undefined, false, {
          message: `User with email ${email} is not found`,
        });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, {
          message: 'Invalid password or email',
        });
      });
    });
  }),
);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};
