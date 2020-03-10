"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = (req, res) => {
    res.render('profile', { title: 'Profile' });
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
//# sourceMappingURL=profile.js.map