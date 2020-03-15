"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../models/article");
const user_1 = require("../models/user");
const express_validator_1 = require("express-validator");
exports.add = (req, res) => {
    res.render('add', { title: 'Add article' });
};
exports.postAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('title')
        .isLength({ min: 10 })
        .run(req);
    yield express_validator_1.check('text')
        .isLength({ min: 10 })
        .run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.redirect('/article/add');
    }
    const { title, text } = req.body;
    const { _id } = req.user;
    const article = new article_1.Article({
        title,
        text,
        authorID: _id,
    });
    article_1.Article.findOne({ title }, (err, existingArticleTitle) => {
        if (err)
            return next(err);
        if (existingArticleTitle) {
            req.flash('errors', {
                msg: 'Article with that title already exists. Please choose another title',
            });
        }
        article.save(err => {
            if (err)
                return next(err);
            req.flash('success', { msg: 'Article published!' });
            res.redirect('/');
        });
    });
});
exports.updateArticle = (req, res) => {
    article_1.Article.findOne({ slug: req.params.slug }, (err, article) => {
        if (err)
            return new Error(err);
        if (req.user._id != article.authorID) {
            res.redirect(401, '/');
        }
        else {
            res.render('edit', {
                article,
                title: `Edit ${article.title}`,
            });
        }
    });
};
exports.postUpdateArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('title')
        .isLength({ min: 10 })
        .run(req);
    yield express_validator_1.check('text')
        .isLength({ min: 10 })
        .run(req);
    const errors = express_validator_1.validationResult(req);
    const { title, text } = req.body;
    const article = { title, text };
    article_1.Article.updateOne({ slug: req.params.slug }, article, err => {
        if (err)
            return next(err);
        return res.redirect('/');
    });
});
exports.single = (req, res) => {
    article_1.Article.findOne({ slug: req.params.slug }, (err, article) => {
        user_1.User.findById(article.authorID, (err, user) => {
            if (err)
                return new Error(err);
            res.render('single', {
                article,
                title: article.title,
                author: user.name,
            });
        });
    });
};
exports.deleteArticle = (req, res) => {
    article_1.Article.deleteOne({ _id: req.params.id }, err => {
        if (err)
            return new Error(err);
        res.send('Success');
    });
};
//# sourceMappingURL=article.js.map