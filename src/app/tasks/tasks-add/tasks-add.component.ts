import { Component } from '@angular/core';
import { Task } from '../tasks.model';
import { TaskService } from '../tasks.service';
import { FormsModule, NgModel } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks-add.component.html',
  styleUrl: './tasks-add.component.css'
})

export class TasksAddComponent {

  AddTaskValue: string = '';

  constructor(private taskService: TaskService) {}

  onTaskAdd(event: any) { 
    let task: Omit<Task, "id"> = new Task(event.target.value, this.getTodayasString(), false);
    this.taskService.saveTask(task).pipe(
      map(response => response.body as Task)
    ).subscribe(
      (response) => {
        this.AddTaskValue = ' '; // Clear the input field after adding the task
        this.taskService.emitTasks(response); // Emit the new task
      }
    )
  }

  getTodayasString(): string {
    let today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    let yyyy: any = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
  }
}
