"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = __importDefault(require("path"));
const express_flash_1 = __importDefault(require("express-flash"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const secrets_1 = require("./config/secrets");
const MongoStore = connect_mongo_1.default(express_session_1.default);
mongoose_1.default.connect(secrets_1.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose_1.default.connection;
db.on('error', err => console.error(err));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Importing controllers
const homeController = __importStar(require("./controllers/home"));
const signupController = __importStar(require("./controllers/signup"));
const loginController = __importStar(require("./controllers/login"));
const profileController = __importStar(require("./controllers/profile"));
const articleController = __importStar(require("./controllers/article"));
// Passport config
const passportConfig = __importStar(require("./config/passport"));
const app = express_1.default();
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(compression_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: secrets_1.SESSION_SECRET,
    store: new MongoStore({
        url: secrets_1.MONGOURI,
        autoReconnect: true,
    }),
    cookie: {
        secure: true,
        maxAge: 86400000,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_flash_1.default());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// Controllers
app.get('/', homeController.index);
app.get('/signup', signupController.signup);
app.post('/signup', signupController.postSignup);
app.get('/login', loginController.login);
app.post('/login', loginController.postLogin);
app.get('/article/add', articleController.add);
app.post('/article/add', passportConfig.isAuthenticated, articleController.postAdd);
app.get('/article/:slug', articleController.single);
app.get('/profile', passportConfig.isAuthenticated, profileController.profile);
app.get('/logout', passportConfig.isAuthenticated, profileController.logout);
app.set('port', process.env.PORT || 3000);
exports.default = app;
//# sourceMappingURL=app.js.map