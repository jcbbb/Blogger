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
const user_1 = require("../models/user");
const express_validator_1 = require("express-validator");
exports.signup = (req, res) => {
    res.render('signup', { title: 'Signup' });
};
exports.postSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    yield express_validator_1.check('password', 'Password must be at least 6 characters long')
        .isLength({ min: 6 })
        .run(req);
    yield express_validator_1.sanitize('email')
        .normalizeEmail({ gmail_remove_dots: false })
        .run(req);
    const errors = express_validator_1.validationResult;
    const { name, email, password } = req.body;
    const user = new user_1.User({
        name,
        email,
        password,
    });
    user_1.User.findOne({ email }, (err, existingUser) => {
        if (err)
            return next(err);
        if (existingUser) {
            console.log('User with that email already exists');
            return res.redirect('/signup');
        }
        user.save((err) => {
            if (err)
                return next(err);
            res.redirect('/');
        });
    });
});
//# sourceMappingURL=signup.js.map