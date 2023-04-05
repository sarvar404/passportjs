import express, { response } from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import DBConnection from './db.js';

// extra file
import userRouter from './router.js'
import ejs from 'ejs';
import passport from 'passport';
import { initializingPassport } from './passportConfig.js';
import expressSession from 'express-session';


// create express instance.
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;



// middleware
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

// passport
app.use(expressSession({secret: "secret", resave: false, saveUninitialized:false})); // this should be first
app.use(passport.initialize());
app.use(passport.session());



// now calling view
app.use('/', userRouter);



// start server...

app.listen(PORT , ()=>{
    DBConnection();
    initializingPassport(passport);
    console.log(`app running at http://localhost:${PORT}`);
});