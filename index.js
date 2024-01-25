const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "public")));

const todos = [];

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

app.post("/todo/delete", (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.status(400).json({ error: "ID del todo mancante" });
    return;
  }

  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Todo non trovato" });
    return;
  }

  todos.splice(index, 1);
  res.json({ success: true });
});

app.get("/todo", (req, res) => {
  res.json({ todos: todos });
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});
