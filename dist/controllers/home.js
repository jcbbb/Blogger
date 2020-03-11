"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("../models/article");
exports.index = (req, res) => {
    article_1.Article.find({}, (err, articles) => {
        if (err)
            return console.error(err);
        res.render('home', { title: 'Home', articles });
    });
};
//# sourceMappingURL=home.js.map