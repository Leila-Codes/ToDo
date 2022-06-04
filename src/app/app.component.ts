import { Component } from '@angular/core';
import {TodoService} from "./todo.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToDoItem} from "./todo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';

  // timerEnabled: boolean = true;

  newItemForm = new FormGroup({
    'label': new FormControl(''),
    'description': new FormControl('')
  })

  constructor(private service: TodoService) {
  }



  addItem() {
    const item = new ToDoItem(
      this.newItemForm.get('label')?.value,
      this.newItemForm.get('description')?.value,
    );

    this.service.addItem(item);
    this.newItemForm.patchValue({
      'label': '',
      'description': ''
    });
  }
}
