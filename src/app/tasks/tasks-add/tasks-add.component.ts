import { Component } from '@angular/core';
import { Task } from '../tasks.model';
import { TaskService } from '../tasks.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-tasks-add',
  standalone: true,
  imports: [NgModel],
  templateUrl: './tasks-add.component.html',
  styleUrl: './tasks-add.component.css'
})
export class TasksAddComponent {

  AddTaskValue: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() { 

  }

  onTaskAdd(event: any) { 
    let task: Task = new Task(event.target.value, false, this.getTodayasString());
    this.taskService.addTask(task).suscribe(
      (newTask: Task) => {
        this.AddTaskValue = ' '; // Clear the input field after adding the task
        this.taskService.onTaskAdded.emit(newTask); // Emit the new task
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
