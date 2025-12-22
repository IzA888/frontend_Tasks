import { Component, Input } from '@angular/core';
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

  constructor(private taskService: TaskService) {};

  ngOnInit() { 
    console.log("init component");
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
    this.taskService.updateTask(task, event.target.checked).subscribe(
      (resp) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index > -1) {
          this.tasks[index] = resp;
        }
      }
    );
  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id).subscribe(() => {
      this.taskService.reload();
    });
  }
}
