import express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import mongo from 'connect-mongo';
import path from 'path';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import { MONGOURI, SESSION_SECRET } from './config/secrets';

const MongoStore = mongo(session);

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Importing controllers
import * as homeController from './controllers/home';
import * as signupController from './controllers/signup';
import * as loginController from './controllers/login';
import * as profileController from './controllers/profile';

// Passport config
import * as passportConfig from './config/passport';

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      url: MONGOURI,
      autoReconnect: true,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
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
app.get('/profile', profileController.profile);
app.get('/logout', profileController.logout);
app.set('port', process.env.PORT || 3000);

export default app;
