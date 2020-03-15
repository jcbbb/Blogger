import { User, UserDocument } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { check, sanitize, validationResult } from 'express-validator';

export const signup = (req: Request, res: Response) => {
  if (req.user) return res.redirect('/');
  res.render('signup', { title: 'Signup' });
};

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check('email', 'Email is not valid')
    .isEmail()
    .run(req);
  await check('password', 'Password must be at least 6 characters long')
    .isLength({ min: 6 })
    .run(req);
  await sanitize('email')
    .normalizeEmail({ gmail_remove_dots: false })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/signup');
  }

  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) {
      req.flash('errors', {
        msg: `Email already exists`,
      });
      return res.redirect('/signup');
    }

    user.save(err => {
      if (err) return next(err);
      req.login(user, err => {
        if (err) return next(err);
      });
      res.redirect('/');
    });
  });
};
