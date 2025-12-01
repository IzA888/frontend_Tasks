import { Component } from '@angular/core';
import { TasksComponent } from "./tasks/tasks.component";
import { UserComponent } from "./user/user.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TasksComponent, UserComponent, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  opened = true;

  toggle() {
    this.opened = !this.opened;
  }
}