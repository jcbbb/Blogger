import { Request, Response, NextFunction } from 'express';
import { Article } from '../models/article';

export const index = (req: Request, res: Response, next: NextFunction) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('home', { title: 'Home', articles });
  });
};
