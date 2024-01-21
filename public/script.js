const todo = document.getElementById("todo");
const add = document.getElementById("add");
const doneAll = document.getElementById("doneAll");
const remove = document.getElementById("remove");
const activity = document.getElementById("activity");
const offCanvasTitleDone = document.getElementById("offCanvasTitleDone");
const offCanvasBodyDone = document.getElementById("offCanvasBodyDone");
const offCanvasTitleProgress = document.getElementById(
  "offCanvasTitleProgress",
);
const offCanvasBodyProgress = document.getElementById("offCanvasBodyProgress");
const openDone = document.getElementById("openDone");
const openProgress = document.getElementById("openProgress");
let todos = [];
const templateButton = `<li>
  <div class="row justify-content-end">
      <div class="col %TAG"><p> %TITLE</p></div>
      <div class="col-auto"><button type="button" class="btn btn-outline-success d-inline-flex p-1 rounded-3 %ATTRIBUTO" id="done-%ID">Done <span class="material-icons">
      done
      </span></button></div>
      <div class="col-auto"><button type="button" class="btn btn-outline-danger d-inline-flex p-1 rounded-3" id="delete-%ID">Delete <span class="material-icons">
      delete
      </span></button></div>
  </div>
</li>`;

const templateButtonOffCanvas = `<li>
  <div class="row justify-content-end">
      <div class="col %TAG"><p> %TITLE</p></div>
  </div>
</li>`;

const displayTodo = (todos, todo) => {
  todo.innerHTML = todos
    .map((item) => {
      let stringa = templateButton
        .replace(/%TITLE/g, item.name)
        .replace(/%ID/g, todos.indexOf(item));
      if (item.completed) {
        stringa = stringa
          .replace(/%TAG/g, "text-decoration-line-through")
          .replace(/%ATTRIBUTO/g, "disabled");
      } else {
        stringa = stringa
          .replace(/%TAG/g, "")
          .replace(/TAG/g, "")
          .replace(/%ATTRIBUTO/g, "");
        console.log(stringa);
      }
      return stringa;
    })
    .join("");
};
const addTodo = (name, todos, todo) => {
  todos.push({
    name: name,
    completed: false,
  });
  displayTodo(todos, todo);
};
const doneTodo = (id, todos, todo) => {
  todos[id].completed = true;
  displayTodo(todos, todo);
};
const deleteTodo = (id, todos, todo) => {
  todos.splice(id, 1);
  displayTodo(todos, todo);
};
const deleteAllTodo = () => {
  todos = [];
  todo.innerHTML = "";
};
const completeAllTodo = (todos, todo) => {
  todos.forEach((item) => {
    item.completed = true;
  });
  displayTodo(todos, todo);
};
const displayCompletedTodo = (todos, todo) => {
  todo.innerHTML = todos
    .map((item) => {
      if (item.completed) {
        return templateButtonOffCanvas.replace(/%TITLE/g, item.name);
      }
    })
    .join("");
};

const displayProgressTodo = (todos, todo) => {
  todo.innerHTML = todos
    .map((item) => {
      if (!item.completed) {
        return templateButtonOffCanvas.replace(/%TITLE/g, item.name);
      }
    })
    .join("");
};
add.onclick = () => {
  addTodo(activity.value, todos, todo);
  activity.value = "";
};
remove.onclick = () => {
  deleteAllTodo();
};
todo.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id.split("-")[0] == "delete") {
    deleteTodo(e.target.id.split("-")[1], todos, todo);
  } else if (e.target.id.split("-")[0] == "done") {
    doneTodo(e.target.id.split("-")[1], todos, todo);
  }
});

doneAll.onclick = () => {
  completeAllTodo(todos, todo);
};

openDone.onclick = () => {
  offCanvasTitleDone.innerHTML = "Completati";
  displayCompletedTodo(todos, offCanvasBodyDone);
};

openProgress.onclick = () => {
  offCanvasTitleProgress.innerHTML = "In corso";
  displayProgressTodo(todos, offCanvasBodyProgress);
};
