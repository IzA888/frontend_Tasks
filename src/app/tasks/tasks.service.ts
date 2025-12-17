import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from './tasks.model';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private url ="http://localhost:8080";
    
    onTaskAdded = new Subject<Task>();

    taskAdded$: Observable<Task> = this.onTaskAdded.asObservable();

    constructor(private http: HttpClient) {}

    emitTasks(task: Task){
        this.onTaskAdded.next(task);
    }

    getTasks() {
        return this.http.get<Task[]>(`${this.url}/tasks`, { withCredentials: true});
    }

    updateTask(task: Task, checked: boolean) { 
        task.completed = checked;
        return this.http.post<Task>(`${this.url}/tasks/${task.id}`, task,  { withCredentials: true })
    }

    saveTask(task: Omit<Task, `id`>): Observable<HttpResponse<Task>>{ 
        return this.http.post<Task>(`${this.url}/tasks/save`, task, { 
            observe: 'response',
            withCredentials: true })
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/tasks/${id}`,  { withCredentials: true })
    }
}