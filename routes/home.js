const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");

router.get("/", (req, res) => {
  Todo.find()
    .sort({ name: "asc" })
    .lean()
    .exec((err, result) => {
      if (err) return console.error(err);
      return res.render("index", { todos: result });
    });
});

module.exports = router;
