import mongoose from 'mongoose';
import moment from 'moment';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

export type ArticleDocument = mongoose.Document & {
  title: string;
  slug: string;
  text: string;
  timestamp: string;
  date: string;
};

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: 'title',
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  date: {
    type: String,
    default: moment().format('MMMM D, YYYY'),
  },
});

export const Article = mongoose.model<ArticleDocument>(
  'Article',
  articleSchema,
);
