import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export type ArticleDocument = mongoose.Document & {
  title: string;
  author: string;
  text: string;
};

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Anonymous',
  },
  text: {
    type: String,
    required: true,
  },
});

export const Article = mongoose.model<ArticleDocument>(
  'Article',
  articleSchema
);
