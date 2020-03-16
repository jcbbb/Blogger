"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../models/article");
const user_1 = require("../models/user");
exports.profile = (req, res) => {
    article_1.Article.countDocuments({ authorID: req.user._id }, (err, articleCount) => {
        user_1.User.findOne({ _id: req.user._id }, (err, user) => {
            if (err)
                return new Error(err);
            res.render('profile', {
                title: 'Profile',
                articleCount,
                bookMarkCount: user.bookmarks.length,
            });
        });
    });
};
exports.profileArticle = (req, res) => {
    article_1.Article.find({ authorID: req.user._id }, (err, article) => {
        if (err)
            return new Error(err);
        res.render('profile-articles', {
            title: 'Your articles',
            articles: article,
        });
    });
};
exports.savedArticle = (req, res) => {
    res.render('saved-articles', { title: 'Saved articles' });
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
//# sourceMappingURL=profile.js.map