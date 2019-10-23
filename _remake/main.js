import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import expressSession from "express-session";
const flash = require('connect-flash');
const path = require('upath');
const FileStore = require('session-file-store')(expressSession);
import { initApiNew } from "./lib/init-api-new";
import { initApiSave } from "./lib/init-api-save";
import { initRenderedRoutes } from "./lib/init-rendered-routes";
import { initUserAccounts } from "./lib/init-user-accounts";
import RemakeStore from "./lib/remake-store";
import { showConsoleError } from "./utils/console-utils";
const pathMatch = require('path-match')({});


// set up environment variables
dotenv.config({ path: "variables.env" });
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}


const app = express();
app.use(express.static(path.join(__dirname, './dist')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  let isAjaxRequest = function() {
    return req.xhr || /json/i.test(req.headers.accept);
  };

  req.isAjax = isAjaxRequest();

  next();
});

// attach url data to the request
app.use(function (req, res, next) {

  req.urlData = {};
  req.urlData.url = req.protocol + '://' + req.get('host') + req.originalUrl;
  req.urlData.referrerUrl = req.get('Referrer') || "";

  req.urlData.urlObj = new URL(req.urlData.url) || {};
  req.urlData.urlPathname = req.urlData.urlObj.pathname || {};

  req.urlData.referrerUrlObj = (req.urlData.referrerUrl && new URL(req.urlData.referrerUrl)) || {};
  req.urlData.referrerUrlPathname = (req.urlData.referrerUrl && req.urlData.referrerUrlObj.pathname) || "";

  // attach params
  let routeMatcher = pathMatch("/:firstParam?/:secondParam?/:thirdParam?/:fourthParam?");
  let pageParams;
  if (req.isAjax) {
    // for ajax requests:
    // - we get the path segments from the referrer
    // - there will always be a max of 3 path segments in the referrer
    pageParams = routeMatcher(req.urlData.referrerUrlPathname);
  } else if (!RemakeStore.isMultiTenant()) {
    // when single-tenant is enabled, there will always be a max of 3 path segments
    pageParams = routeMatcher(req.urlData.urlPathname);
  } else {
    // this case is for a multi-tenant, non-ajax request (i.e. a page render)
    // there will always be a max of 4 path segments in this case.
    // the first segment is the app name and simply needs to be stripped out
    let {firstParam, secondParam, thirdParam, fourthParam} = routeMatcher(req.urlData.urlPathname);
    pageParams = {firstParam: secondParam, secondParam: thirdParam, thirdParam: fourthParam};
  }
  req.urlData.pageParams = pageParams || [];

  next();
});


// add appName to request object
if (RemakeStore.isMultiTenant()) {
  app.use(function (req, res, next) {
    let splitString = req.get("host").split(".");
    let validSplit = splitString.length === 3;
    let appName = splitString[0] || "";
    let validAppName = /^[a-z]+[a-z0-9-]*$/.test(appName);

    if (!validSplit || !validAppName) {
      res.status(500).send("500 Server Error - No App Found");
      return;
    }

    req.appName = appName;

    next();
  });
}

// express session
app.use(  expressSession({ 
  store: new FileStore({path: path.join(__dirname, './.sessions')}),
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true,
  cookie: {
    maxAge: 2628000, // one month
  }
}));

// requires sessions
app.use(flash());


// REMAKE FRAMEWORK CORE
initUserAccounts({ app });
initApiNew({ app });
initApiSave({ app });
initRenderedRoutes({ app });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)

  if (process.send) {
    process.send('online');
  }
})








