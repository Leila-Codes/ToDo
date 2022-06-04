import {Component, Host, Input, OnInit} from '@angular/core';
import {ToDoItem} from "../todo.model";
import {TodoListComponent} from "../todo-list/todo-list.component";
import {TodoService} from "../todo.service";
import {faCheck, faSync} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  completeIcon = faCheck;
  progressIcon = faSync

  timerEnabled = true;

  @Input() info: ToDoItem | undefined;
  // @Host() list: TodoListComponent | undefined;

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.service.timerSettingChange.subscribe((setting) => {
      this.timerEnabled = setting;
    })
  }

  completeItem() {
    if (this.info) {
      this.info.complete();
      this.service.updateProgress();
    }
  }

  removeItem() {
    if (this.info) {
      this.service.removeItem(this.info.label);
    }
  }

}
