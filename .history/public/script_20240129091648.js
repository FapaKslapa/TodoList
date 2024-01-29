const todo = document.getElementById("todo");
const add = document.getElementById("add");
const doneAll = document.getElementById("doneAll");
const remove = document.getElementById("remove");
const activity = document.getElementById("activity");
const offCanvasTitleDone = document.getElementById("offCanvasTitleDone");
const offCanvasBodyDone = document.getElementById("offCanvasBodyDone");
const offCanvasTitleProgress = document.getElementById(
  "offCanvasTitleProgress"
);
const offCanvasBodyProgress = document.getElementById("offCanvasBodyProgress");
const openDone = document.getElementById("openDone");
const openProgress = document.getElementById("openProgress");
let todos = [];
const templateButton = `<li>
  <div class="row justify-content-end">
      <div class="col %TAG"><p> %TITLE</p></div>
      <div class="col-auto"><button type="button" class="btn btn-outline-success d-inline-flex p-1 rounded-3 todo %ATTRIBUTO" id="done-%ID">Done <span class="material-symbols-rounded">
done
</span></button></div>
      <div class="col-auto"><button type="button" class="btn btn-outline-danger d-inline-flex p-1 rounded-3 todo" id="delete-%ID">Delete <span class="material-symbols-rounded">
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
        .replace(/%ID/g, item.id)
        .replace(/%ID/g, item.id);
      if (item.completed) {
        stringa = stringa
          .replace(/%TAG/g, "text-decoration-line-through")
          .replace(/%ATTRIBUTO/g, "disabled");
      } else {
        stringa = stringa
          .replace(/%TAG/g, "")
          .replace(/TAG/g, "")
          .replace(/%ATTRIBUTO/g, "");
      }
      return stringa;
    })
    .join("\n");

  const buttonList = document.querySelectorAll(".todo");
  buttonList.forEach((button) => {
    button.onclick = () => {
      if (button.id.indexOf("delete-") != -1) {
        const id = button.id.replace("delete-", "");
        deleteTodo(id).then((data) => {
          load().then((data) => {
            displayTodo(data.todos, todo);
          });
        });
      }
      if (button.id.indexOf("done-") != -1) {
        const id = button.id.replace("done-", "");
        let currentTodo = todos.find((todo) => todo.id === id);
        if (currentTodo) {
          currentTodo.completed = true;
        }
        completeTodo(currentTodo).then((data) => {
          load().then((data) => {
            displayTodo(data.todos, todo);
          });
        });
      }
      displayTodo(todos, todo);
    };
  });
};
const addTodo = (name, todos, todo) => {
  send({
    todo: {
      name: name,
      completed: false,
    },
  }).then((data) => {
    load().then((data) => {
      displayTodo(data.todos, todo);
    });
  });
};
const completeTodo = (todo) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/complete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};
const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};
const deleteAllTodo = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo/deleteAll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};
const completeAllTodo = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo/completeAll", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
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

const send = (todo) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => {
        reject("Error:", error);
      });
  });
};

const load = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo")
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

const loadCompleated = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo/completed")
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

const loadIncomplete = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo/incomplete")
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

add.onclick = () => {
  addTodo(activity.value, todos, todo);
  activity.value = "";
};
remove.onclick = () => {
  deleteAllTodo().then((data) => {
    load().then((data) => {
      displayTodo(data.todos, todo);
    });
  });
};

doneAll.onclick = () => {
  completeAllTodo().then((data) => {
    load().then((data) => {
      displayTodo(data.todos, todo);
    });
  });
};
openDone.onclick = () => {
  offCanvasTitleDone.innerHTML = "Completati";
  loadCompleated().then((data) => {
    displayCompletedTodo(
      data,
      offCanvasBodyDone
    );
  });
  displayCompletedTodo(todos, offCanvasBodyDone);
};
openProgress.onclick = () => {
  offCanvasTitleProgress.innerHTML = "In corso";
  displayProgressTodo(todos, offCanvasBodyProgress);
};

setInterval(() => {
  load().then((data) => {
    displayTodo(data.todos, todo);
  });
}, 300000);

load().then((data) => {
  displayTodo(data.todos, todo);
});
