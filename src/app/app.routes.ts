import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { authGuard } from './user/auth.guard';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'tasks',
                component: TasksComponent,
                canActivate: [authGuard]
            },
            {
                path: 'user',
                component: UserComponent,
                canActivate: [authGuard]
            }
        ]
    }
];
