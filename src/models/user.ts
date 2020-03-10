import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export type UserDocument = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  gravatar: (size: number) => string;
};

const userSchema = new mongoose.Schema({
  name: { required: true, type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Getting User's Gravatar
userSchema.methods.gravatar = function(size: number = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash('md5')
    .update(this.email)
    .digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
export const User = mongoose.model<UserDocument>('User', userSchema);
