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
const express_validator_1 = require("express-validator");
exports.add = (req, res) => {
    res.render('add', { title: 'Add article' });
};
exports.single = (req, res) => {
    article_1.Article.findOne({ slug: req.params.slug }, (err, article) => {
        res.render('single', {
            article,
            title: article.title,
        });
    });
};
exports.postAdd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('title')
        .isLength({ min: 10 })
        .run(req);
    yield express_validator_1.check('text')
        .isLength({ min: 10 })
        .run(req);
    const errors = express_validator_1.validationResult;
    const { title, text } = req.body;
    const article = new article_1.Article({
        title,
        text,
    });
    article_1.Article.findOne({ title }, (err, existingArticleTitle) => {
        if (err)
            return next(err);
        if (existingArticleTitle) {
            req.flash('error', 'Article with that title already exists. Please choose another title');
        }
        article.save(err => {
            if (err)
                return next(err);
            req.flash('success', 'Article published!');
            res.redirect('/');
        });
    });
});
//# sourceMappingURL=article.js.map