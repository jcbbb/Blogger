import { Article, ArticleDocument } from '../models/article';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const add = (req: Request, res: Response) => {
  res.render('add', { title: 'Add article' });
};

export const single = (req: Request, res: Response) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    res.render('single', {
      article,
      title: article.title,
    });
  });
};

export const postAdd = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check('title')
    .isLength({ min: 10 })
    .run(req);
  await check('text')
    .isLength({ min: 10 })
    .run(req);

  const errors = validationResult;
  const { title, text } = req.body;

  const article = new Article({
    title,
    text,
  });

  Article.findOne({ title }, (err, existingArticleTitle) => {
    if (err) return next(err);
    if (existingArticleTitle) {
      req.flash(
        'error',
        'Article with that title already exists. Please choose another title',
      );
    }
    article.save(err => {
      if (err) return next(err);
      req.flash('success', 'Article published!');
      res.redirect('/');
    });
  });
};
