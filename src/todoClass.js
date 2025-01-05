export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = "";
    this.checklist = "empty";
  }
  ToggleCheck() {
    if (this.checklist == "empty") {
      this.checklist = "active";
    }
    else if (this.checklist == "active") {
      this.checklist = "empty";
    }
    console.log(this.title + " " + this.checklist);
  }
}
