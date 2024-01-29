const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

let todos = [];

app.post("/todo/add", (req, res) => {
  const singleTodo = req.body;
  if (singleTodo.todo) {
    const todo = req.body.todo;
    todo.id = "" + new Date().getTime();
    todos.push(todo);
    res.json({ result: "Ok" });
  } else {
    res
      .status(400)
      .json({ error: "Todo non fornito nel corpo della richiesta" });
  }
});

app.put("/todo/complete", (req, res) => {
  const todo = req.body;
  try {
    todos = todos.map((element) => {
      if (element.id === todo.id) {
        return todo;
      }
      return element;
    });
  } catch (e) {}
  res.json({ result: "Ok" });
});

app.delete("/todo/:id", (req, res) => {
  todos = todos.filter((element) => element.id !== req.params.id);
  res.json({ result: "Ok" });
});
app.delete("/todo/deleteAll", (req, res) => {
  todos = [];
  res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
  res.json({ todos: todos });
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});
