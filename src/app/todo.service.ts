import {EventEmitter, Injectable} from '@angular/core';
import {ToDoItem} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  items: ToDoItem[] = [];

  timerSettingChange: EventEmitter<boolean> = new EventEmitter();
  progressChange: EventEmitter<number> = new EventEmitter();
  // itemChange: EventEmitter<ToDoItem> = new EventEmitter<ToDoItem>();

  constructor() {
    const storage = localStorage.getItem('todo');
    if (storage) {
      const items = JSON.parse(storage);
      items.map((item: ToDoItem) => {
        const newItem = new ToDoItem(item.label, item.description);
        newItem.completed = item.completed;
        return newItem;
      }).forEach(this.addItem.bind(this));

      setTimeout(this.updateProgress.bind(this), 500);
    }
  }

  toggleTimer(active: boolean) {
    this.timerSettingChange.emit(active);
  }

  updateProgress() {
    this.progressChange.emit();

    this.saveToStorage();
  }

  addItem(item: ToDoItem) {
    this.items.push(item);

    // this.itemChange.emit();

    this.updateProgress();

    this.saveToStorage();
  }

  removeItem(label: string) {
    const idx = this.items.findIndex(i => i.label === label);
    if (idx > -1) {
      this.items.splice(idx, 1);
    }

    this.updateProgress();

    this.saveToStorage();

  }

  saveToStorage() {
    localStorage.setItem('todo', JSON.stringify(this.items));

  }
}
