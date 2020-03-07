const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const hdbr = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

app.engine("handlebars", hdbr({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes/home"));
app.use("/todos", require("./routes/todo"));
app.use("/user", require("./routes/user"));

db.on("error", err => {
  console.log("db error:", err);
});
db.once("open", () => {
  console.log("db connected");
  app.listen(port, () => {
    console.log("listen on port :", port);
  });
});
