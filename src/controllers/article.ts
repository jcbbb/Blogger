import { Article, ArticleDocument } from '../models/article';
import { User, UserDocument } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const add = (req: Request, res: Response) => {
  res.render('add', { title: 'Add article' });
};
export const postAdd = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check('title', "Title can't be less than 10 characters")
    .isLength({ min: 10 })
    .run(req);
  await check('text', "Text can't be less than 10 characters")
    .isLength({ min: 10 })
    .run(req);

  const errors: any = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/article/add');
  }
  const { title, text } = req.body;
  const { _id } = req.user;

  const article = new Article({
    title,
    text,
    authorID: _id,
  });

  Article.findOne({ title }, (err, existingArticleTitle) => {
    if (err) return next(err);
    if (existingArticleTitle) {
      req.flash('errors', {
        msg:
          'Article with that title already exists. Please choose another title',
      });
      return res.redirect('/article/add');
    }
    article.save((err) => {
      if (err) return next(err);
      req.flash('success', { msg: 'Article published!' });
      res.redirect('/article/add');
    });
  });
};

export const updateArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    if (err) return next(err);
    if (req.user._id != article.authorID) {
      res.redirect(401, '/');
    } else {
      res.render('edit', {
        article,
        title: `Edit ${article.title}`,
      });
    }
  });
};

export const postUpdateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await check('title', "Title can't be less than 10 characters")
    .isLength({ min: 10 })
    .run(req);
  await check('text', "Text can't be less than 10 characters")
    .isLength({ min: 10 })
    .run(req);

  const errors: any = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/article/add');
  }

  const { title, text } = req.body;
  const article = { title, text };

  Article.updateOne({ slug: req.params.slug }, article, (err) => {
    if (err) return next(err);
    req.flash('success', { msg: 'Article saved!' });
    return res.redirect(`/article/edit/${req.params.slug}`);
  });
};

export const single = (req: Request, res: Response, next: NextFunction) => {
  Article.findOne({ slug: req.params.slug }, (err, article) => {
    User.findById(article.authorID, (err, user) => {
      if (err) return next(err);
      res.render('single', {
        article,
        title: article.title,
        author: user.name,
      });
    });
  });
};

export const deleteArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Article.deleteOne({ _id: req.params.id }, (err) => {
    User.updateMany({}, { $pull: { bookmarks: req.params.id } }, (err) => {
      if (err) return next(err);
    });
    if (err) return next(err);
    res.send('Success');
  });
};

export const bookmarkArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { bookmarks: req.params.id } },
    (err) => {
      if (err) return next(err);
      res.send('Success');
    },
  );
};

export const unbookmarkArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $unset: { bookmarks: req.params.id } },
    (err) => {
      if (err) return next(err);
      res.send('Success');
    },
  );
};
