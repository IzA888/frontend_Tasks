import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from './tasks.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private url ="http://localhost:8080";
    
    onTaskAdded = new EventEmitter<Task>();

    constructor(private http: HttpClient) {

    }

    getTasks() {
        return this.http.get(`${this.url}/tasks`, { withCredentials: true});
    }

    updateTask(task: Task, checked: boolean) { 
        task.completed = checked;
        return this.http.post(`${this.url}/tasks/${task.id}`, task,  { withCredentials: true })
    }

    saveTask(task: Omit<Task, `id`>): Observable<Task>{ 
        return this.http.post<Task>(`${this.url}/tasks/save`, task, { withCredentials: true })
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/tasks/${id}`,  { withCredentials: true })
    }
}