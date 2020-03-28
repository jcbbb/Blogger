import { Request, Response, NextFunction } from 'express';
import { Article, ArticleDocument } from '../models/article';
import { User, UserDocument } from '../models/user';

export const profile = (req: Request, res: Response, next: NextFunction) => {
  Article.countDocuments({ authorID: req.user._id }, (err, articleCount) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (err) return next(err);
      res.render('profile', {
        title: 'Profile',
        articleCount,
        bookMarkCount: user.bookmarks.length,
      });
    });
  });
};

export const profileArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Article.find({ authorID: req.user._id }, (err, article) => {
    if (err) return next(err);
    res.render('profile-articles', {
      title: 'Your articles',
      articles: article,
    });
  });
};
export const savedArticle = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Article.find({ _id: req.user.bookmarks }, (err, article) => {
    if (err) return next(err);
    res.render('saved-articles', {
      title: 'Saved articles',
      articles: article,
    });
  });
};

export const logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};
