import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from './tasks.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class TaskService {
    
    onTaskAdded = new EventEmitter<Task>();

    constructor(private http: HttpClient) {

    }

    getTasks() {
        return this.http.get("/tasks").pipe(
            map(response => response)
        );
    }

    updateTask(task: Omit<Task, "id">, checked: boolean) { 
        task.completed = checked;
        return this.http.post("/tasks/save", task).pipe(
            map(response => response)
        )
    }

    saveTask(task: Omit<Task, "id">): Observable<Task>{ 
        return this.http.post<Task>("/tasks/save", task).pipe(
            map(response => response)
        )
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>('/tasks/' + id).pipe(
            map(response => response)
        )
    }
}