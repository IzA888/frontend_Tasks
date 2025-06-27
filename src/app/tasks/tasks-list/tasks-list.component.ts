import { Component } from '@angular/core';
import { Task } from '../tasks.model';
import { NgClass, NgFor } from '@angular/common';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) { };

  ngOnInit() { 
    this.taskService.getTasks().subscribe(
      (tasks: any) => {
        this.tasks = tasks
        },
        (error: any) => console.log(error)
    );

    this.taskService.onTaskAdded.subscribe(
      (task: Task) => {
        this.tasks.push(task);
      }
    );
    
  };

  getDueDateLabel(task: Task) {
    return task.completed ? 'label-success' : 'labl-primary';
  }

  onTasksChange(event: any, task: Task) {
    this.taskService.saveTask(task, event.target.checked).subscribe();
  }
}
