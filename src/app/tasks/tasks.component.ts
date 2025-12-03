import { Component } from '@angular/core';
import { TasksAddComponent } from "./tasks-add/tasks-add.component";
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { NgIf } from '@angular/common';
import { User } from '../user/user.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TasksAddComponent, TasksListComponent, NgIf],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  user!: User;
}
