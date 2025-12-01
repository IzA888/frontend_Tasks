import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksComponent } from "./tasks/tasks.component";
import { UserComponent } from "./user/user.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
