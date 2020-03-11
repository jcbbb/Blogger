"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
const articleSchema = new mongoose_1.default.Schema({
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
        default: moment_1.default().format('MMMM D, YYYY'),
    },
});
exports.Article = mongoose_1.default.model('Article', articleSchema);
//# sourceMappingURL=article.js.map