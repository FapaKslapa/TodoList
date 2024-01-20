const todo = document.getElementById("todo");
const add = document.getElementById("add");
const remove = document.getElementById("remove");
const activity = document.getElementById("activity");
let todos = [];
const templateButton = `<li>
  <div class="row justify-content-end">
      <div class="col">%TAG %TITLE %TAG</div>
      <div class="col-auto"><button type="button" class="btn btn-outline-success %ATTRIBUTO" id="done-%ID">Done</button></div>
      <div class="col-auto"><button type="button" class="btn btn-outline-danger" id="delete-%ID">Delete</button></div>
  </div>
</li>`;
const addTodo = (name) => {
  todos.push({
    name: name,
    completed: false,
  });
  todo.innerHTML = todos
    .map((item) => {
      let stringa = templateButton
        .replace(/%TITLE/g, item.name)
        .replace(/%ID/g, todos.indexOf(item));
      if (item.completed) {
        stringa = stringa
          .replace(/%TAG/g, "<del>")
          .replace(/TAG/g, "</del>")
          .replace(/%ATTRIBUTO/g, "disabled");
      } else {
        stringa = stringa
          .replace(/%TAG/g, "<p>")
          .replace(/TAG/g, "</p>")
          .replace(/%ATTRIBUTO/g, "");
        console.log(stringa);
      }
      return stringa;
    })
    .join("");
};

const doneTodo = (id) => {
  todos[id].completed = true;
  todo.innerHTML = todos
    .map((item) => {
      let stringa = templateButton
        .replace(/%TITLE/g, item.name)
        .replace(/%ID/g, todos.indexOf(item));
      if (item.completed)
        stringa = stringa
          .replace(/%TAG/g, "<del>")
          .replace(/%TAG/g, "</del>")
          .replace(/%ATTRIBUTO/g, "disabled");
      else
        stringa = stringa
          .replace(/%TAG/g, "<p>")
          .replace(/%TAG/g, "</p>")
          .replace(/%ATTRIBUTO/g, "");
      return stringa;
    })
    .join("");
};

const deleteTodo = (id) => {
  todos.splice(id, 1);
  todo.innerHTML = todos
    .map((item) => {
      let stringa = templateButton
        .replace(/%TITLE/g, item.name)
        .replace(/%ID/g, todos.indexOf(item));
      if (item.completed)
        stringa = stringa
          .replace(/%TAG/g, "<del>")
          .replace(/%TAG/g, "</del>")
          .replace(/%ATTRIBUTO/g, "disabled");
      else
        stringa = stringa
          .replace(/%TAG/g, "<p>")
          .replace(/%TAG/g, "</p>")
          .replace(/%ATTRIBUTO/g, "");
      return stringa;
    })
    .join("");
};

const deleteAllTodo = () => {
  todos = [];
  todo.innerHTML = "";
};

add.onclick = () => {
  addTodo(activity.value);
  activity.value = "";
};
remove.onclick = () => {
  deleteAllTodo();
};
todo.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id.split("-")[0] == "delete")
    deleteTodo(e.target.id.split("-")[1]);
  else if (e.target.id.split("-")[0] == "done")
    doneTodo(e.target.id.split("-")[1]);
});
