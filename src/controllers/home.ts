import { Request, Response } from 'express';
import { Article } from '../models/article';

export const index = (req: Request, res: Response) => {
  Article.find({}, (err, articles) => {
    if (err) return console.error(err);
    res.render('home', { title: 'Home', articles });
  });
};
