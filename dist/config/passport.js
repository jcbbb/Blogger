"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const localStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    user_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    user_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err)
            return done(err);
        if (!user) {
            return done(undefined, false, {
                message: `User with email ${email} is not found`,
            });
        }
        bcryptjs_1.default.compare(password, user.password, (err, isMatch) => {
            if (err)
                return done(err);
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, {
                message: 'Invalid password or email',
            });
        });
    });
}));
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};
//# sourceMappingURL=passport.js.map