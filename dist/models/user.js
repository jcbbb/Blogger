"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.default.Schema({
    name: { required: true, type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    bookmarks: { type: Array },
});
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    bcryptjs_1.default.genSalt(10, (err, salt) => {
        if (err)
            return next(err);
        bcryptjs_1.default.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});
// Getting User's Gravatar
userSchema.methods.gravatar = function (size = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto_1.default
        .createHash('md5')
        .update(this.email)
        .digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map