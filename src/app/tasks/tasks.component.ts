import { Component } from '@angular/core';
import { TasksAddComponent } from "./tasks-add/tasks-add.component";
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TasksAddComponent, TasksListComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

}
