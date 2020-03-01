const express = require("express");
const mongoose = require("mongoose");
const hdbr = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
const Todo = require("./model/todo");

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

app.engine("handlebars", hdbr({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  Todo.find()
    .lean()
    .exec((err, result) => {
      if (err) return console.error(err);
      return res.render("index", { todos: result });
    });
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  const todo = Todo.findById(req.params.id)
    .lean()
    .exec((err, todo) => {
      if (err) return console.error(err);
      return res.render("detail", { todo });
    });
});
// 列出全部 Todo
app.get("/todos", (req, res) => {
  return res.redirect("/");
});
// 新增一筆 Todo 頁面
app.get("/todos/new", (req, res) => {
  res.render("new");
});
// 新增一筆  Todo
app.post("/todos", (req, res) => {
  const { name } = req.body;
  const todo = new Todo({
    name: req.body.name
  });
  todo.save(err => {
    console.log({ err });
    if (err) return console.error(err);
    return res.redirect("/");
  });
});
// 修改 Todo 頁面
app.get("/todos/:id/edit", (req, res) => {
  res.send("修改 Todo 頁面");
});
// 修改 Todo
app.post("/todos/:id/edit", (req, res) => {
  res.send("修改 Todo");
});
// 刪除 Todo
app.post("/todos/:id/delete", (req, res) => {
  res.send("刪除 Todo");
});

db.on("error", err => {
  console.log("db error:", err);
});
db.once("open", () => {
  console.log("db connected");
  app.listen(port, () => {
    console.log("listen on port :", port);
  });
});
