import { Component } from '@angular/core';
import { TasksAddComponent } from "./tasks-add/tasks-add.component";
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TasksAddComponent, TasksListComponent, NgIf, AsyncPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  user: User | null = null;
  error = '';
  user$ = this.userService.user$;

  constructor(private userService: UserService){}

}
