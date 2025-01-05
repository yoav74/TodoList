import "./styles.css";
import { Todo } from "./todoClass";
import { compareAsc, format } from "date-fns";
const { add } = require("date-fns");

const TodoList = [];

function AddTodo() {
  const formData = new FormData(document.getElementById("form"));
  const title = formData.get("title");
  const description = formData.get("description");
  const due = formData.get("date");
  const prio = formData.get("prio");
  const NewTodo = new Todo(title, description, due, prio);
  CreateTask(NewTodo);
  TodoList.push(NewTodo);
  console.log(NewTodo);
  const div = document.querySelector("#div");
  div.remove();
}

function CreateForm() {
  let FormDiv = document.createElement("div");
  let MyForm = document.createElement("form");
  MyForm.setAttribute("method", "dialog");
  MyForm.addEventListener("submit", AddTodo);
  MyForm.setAttribute("target", "_self");
  MyForm.id = "form";
  FormDiv.id = "div";

  let title = document.createElement("input"); //input element, text
  title.setAttribute("type", "text");
  title.setAttribute("name", "title");
  title.setAttribute("placeholder", "Title");
  title.required = true;

  let description = document.createElement("input"); //input element, text
  description.setAttribute("type", "text");
  description.setAttribute("name", "description");
  description.setAttribute("placeholder", "Description (Optional)");

  let MyDate = document.createElement("input"); //input element, text
  MyDate.setAttribute("type", "date");
  MyDate.setAttribute("name", "date");
  MyDate.required = true;

  let priority = document.createElement("input"); //input element, text
  priority.setAttribute("type", "number");
  priority.setAttribute("name", "prio");
  priority.id = "prio";
  priority.setAttribute("min", "1");
  priority.setAttribute("max", "5");
  priority.setAttribute("placeholder", "Min 1-5 Max");
  priority.required = true;

  let submitBtn = document.createElement("input"); //input element, Submit button
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");

  MyForm.appendChild(title);
  MyForm.appendChild(description);
  MyForm.appendChild(MyDate);
  MyForm.appendChild(priority);
  MyForm.appendChild(submitBtn);
  const CreateBody = document.querySelector(".Create");
  CreateBody.appendChild(FormDiv);
  FormDiv.appendChild(MyForm);
}

function CreateTask(task) {
  const taskCard = document.createElement("div");
  taskCard.className = "card";
  const newh1 = document.createElement("h1");
  newh1.textContent = task.title;
  const desc = document.createElement("p");
  if (task.description != "") {
    desc.textContent = "Description: " + task.description;
  }
  const thisdate = document.createElement("p");
  thisdate.textContent = "Due Date: " + format(task.dueDate, "dd-MM-yyyy");
  const prio = document.createElement("p");
  prio.textContent = "Priority: " + task.priority;
  const ButtonDiv = document.createElement("div");
  ButtonDiv.id = "buttondiv";
  const toggleLabel = document.createElement("label");
  toggleLabel.textContent = "Check Task";
  toggleLabel.setAttribute("for", "check");
  const toggle = document.createElement("input");
  toggle.setAttribute("type", "checkbox");
  toggle.addEventListener("change", () => {
    task.ToggleCheck();
    UpdateActiveTasks();
  });
  toggle.name = "check";
  toggle.id = "check";
  const RemoveBtn = document.createElement("button");
  RemoveBtn.id = "removebtn";
  RemoveBtn.textContent = "Remove Task";
  RemoveBtn.addEventListener("click", () => {
    taskCard.remove();
    TodoList.pop(TodoList.indexOf(task));
    UpdateActiveTasks();
  });

  taskCard.appendChild(newh1);
  taskCard.appendChild(desc);
  taskCard.appendChild(thisdate);
  taskCard.appendChild(prio);
  taskCard.appendChild(ButtonDiv);
  ButtonDiv.appendChild(toggleLabel);
  ButtonDiv.appendChild(toggle);
  taskCard.appendChild(RemoveBtn);
  DisplayDiv.appendChild(taskCard);
}

function ToggleCheckbox(box) {
  if (box.style.color == "white")
    box.style.color = "blue";
  else if (box.style.color == "blue")
    box.style.color = "white";
}
function UpdateActiveTasks() {
  TodoList.sort((a,b) => b.priority-a.priority);
  let text = "Active Tasks by priority: ";
  let normalized = '';
  TodoList.forEach(element => {
    if (element.checklist == "active") {
      text += element.title + ", ";
    }
  }

  )
  if (text.at(-2) == ",") {
    // text.replace(/.$/,".");
    normalized = text.slice(0, -2) + ".";
  }
  console.log(normalized);
  TaskP.textContent = normalized;
}

console.log("testing");
const FormBtn = document.querySelector("#openform");
FormBtn.addEventListener("click", CreateForm);
const ActiveTasks = document.querySelector(".active");
const TaskP = document.createElement("p");
ActiveTasks.appendChild(TaskP);
const DisplayDiv = document.querySelector(".Display");
const Task1 = new Todo("Run", "Run every day", "2025-01-05", "2");
TodoList.push(Task1);
CreateTask(Task1);
