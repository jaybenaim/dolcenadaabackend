const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const index = require("./routes");
const users = require("./routes/api/users");
const products = require("./routes/api/products");
const email = require("./routes/api/email");
const cors = require("cors");
const CONSTANTS = require("./constants");
const { PORT: port } = CONSTANTS;
const passport = require("passport");
const sgMail = require("@sendgrid/mail");
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("admin-bro-expressjs");
const adminBro = require("./config/adminBro");
const bcrypt = require("bcryptjs");
const withAuth = require("./Middleware/auth");

const app = express();

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Build and use a router which will handle all AdminBro routes
const adminRouter = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: process.env.SECRET,
});

app.use(adminBro.options.rootPath, adminRouter);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//  Connect to DB
const db = process.env.MONGO_URI;

// Mongo options

var dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: false,
  useCreateIndex: true,
};
// Connect to MongoDB
mongoose
  .connect(db, dbOptions)
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Cors
const whitelist = [
  "https://dolcenada.ca",
  "https://jaybenaim.github.io",
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5000",
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.resolve(__dirname, "build")));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api", index);
app.use("/api/users", users);
app.use("/api/email", email);
app.use("/api/products", products);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

if (app.settings.env === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("Error occurred while handling the request.");
  });
} else {
  // Log stack trace of error message while in development

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

module.exports = app;
