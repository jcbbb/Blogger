"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGOURI = process.env.MONGOURI;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
//# sourceMappingURL=secrets.js.map