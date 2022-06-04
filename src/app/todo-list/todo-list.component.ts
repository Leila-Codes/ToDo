import { Component, OnInit } from '@angular/core';
import {ToDoItem} from "../todo.model";
import {TodoService} from "../todo.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  items: ToDoItem[] = []
  // timerEnabled: boolean = false;
  progress: string = "0%";

  timerEnabled: boolean = true;

  constructor(private service: TodoService) {
    this.items = this.service.items;

  }

  ngOnInit(): void {

    this.service.progressChange.subscribe(() => {
      let completed = this.items.filter(i => i.completed).length,
        total = this.items.length,
        progress = completed / total;

      if (progress < 1) {
        progress += 0.1;
      }

      this.progress = `${progress * 100}%`;
    })
  }

  totalTime(): number {
    return this.items.reduce((a, b) => {
      const duration = b.duration;
      if (duration) {
        return a + (Math.floor(duration / 1000) * 1000);
      } else {
        return a;
      }
    }, 0)
  }

  next() {
    const nextIdx = this.items.findIndex(i => !i.inProgress && !i.completed);
    if (nextIdx > -1) {
      if (this.items[nextIdx - 1] && !this.items[nextIdx - 1].completed) {
        this.items[nextIdx - 1].complete();
      }
      this.items[nextIdx].start();
    } else if (!this.items[this.items.length - 1].completed) {
      this.items[this.items.length - 1].complete();
    }
  }

  toggleTimers() {
    this.timerEnabled = !this.timerEnabled;
    this.service.toggleTimer(this.timerEnabled);
  }
}
