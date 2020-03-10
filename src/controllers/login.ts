import { Request, Response, NextFunction } from 'express';
import { check, sanitize, validationResult } from 'express-validator';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { UserDocument } from '../models/user';
import '../config/passport';

export const login = (req: Request, res: Response) => {
  res.render('login', { title: 'Login' });
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check('email', 'Email is not valid')
    .isEmail()
    .run(req);
  await check('password', "Password can't less than 6 characters")
    .isLength({ min: 6 })
    .run(req);
  await sanitize('email')
    .normalizeEmail({ gmail_remove_dots: false })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect('/login');
  }

  passport.authenticate(
    'local',
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) return next(err);

      if (!user) {
        req.flash('errors');
        return res.redirect('/login');
      }

      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    }
  )(req, res, next);
};
