const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");
const Tought = require("./models/Tought");
const User = require("./models/User");

const toughtsRoutes = require("./routes/toughtsRoutes");
const ToughtsController = require("./controllers/ToughtsController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use(express.static("public"));
app.use(express.static("public"));

app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
);

//flash messages
app.use(flash());

//set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

//Routes
app.use("/toughts", toughtsRoutes);

app.get("/", ToughtsController.showToughts);

conn
  //   .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));
