const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();
const Todo = require("./model/todo");

mongoose.connect("mongodb://localhost/Todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

app.get("/", (req, res) => {
  res.send("hello world!");
});
// 列出全部 Todo
app.get("/todos", (req, res) => {
  res.send("列出所有 Todo");
});
// 新增一筆 Todo 頁面
app.get("/todos/new", (req, res) => {
  res.send("新增 Todo 頁面");
});
// 顯示一筆 Todo 的詳細內容
app.get("/todos/:id", (req, res) => {
  res.send("顯示 Todo 的詳細內容");
});
// 新增一筆  Todo
app.post("/todos", (req, res) => {
  res.send("建立 Todo");
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
