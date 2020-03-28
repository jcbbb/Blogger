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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const passport_1 = __importDefault(require("passport"));
require("../config/passport");
exports.login = (req, res) => {
    if (req.user)
        return res.redirect('/');
    res.render('login', { title: 'Login' });
};
exports.postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield express_validator_1.check('email', 'Email is not valid')
        .isEmail()
        .run(req);
    yield express_validator_1.check('password', "Password can't be less than 6 characters")
        .isLength({ min: 6 })
        .run(req);
    yield express_validator_1.sanitize('email')
        .normalizeEmail({ gmail_remove_dots: false })
        .run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.redirect('/login');
    }
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            req.flash('errors', { msg: info.message });
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err)
                return next(err);
            req.flash('success', `Logged in as ${user.email}`);
            res.redirect('/');
        });
    })(req, res, next);
});
//# sourceMappingURL=login.js.map