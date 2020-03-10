import { Request, Response, NextFunction } from 'express';

export const profile = (req: Request, res: Response) => {
  res.render('profile', { title: 'Profile' });
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};
