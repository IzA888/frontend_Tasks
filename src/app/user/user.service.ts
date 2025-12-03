import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscribable } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url ="http://127.0.0.1:8080";

    constructor(private http: HttpClient) {}

    private userSubject = new BehaviorSubject<User | null>(null);

    setUser(user: User){
        this.userSubject.next(user);
    }

    getUser$(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    createUser(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(`${this.url}/user/save`, user, {
            observe: 'response',
            withCredentials: true
        })
    }

    getUser(id: number): Observable<User>{
        return this.http.get<User>(`${this.url}/user/${id}`, { withCredentials: true });
    }

    editUser(id: number, user: User): Observable<User>{
        return this.http.put<User>(`${this.url}/user/${id}`, user)
    }
    
    deleteUser(id: number): Observable<User>{
        return this.http.delete<User>(`${this.url}/user/${id}`);
    }

    loginUser(user: User): Observable<HttpResponse<User>>{
        return this.http.post<User>(`${this.url}/user/login`, user, {
            observe: 'response',
            withCredentials: true
        });
    }

    saveToken(token: string){
        localStorage.setItem('token', token.replace("Bearer ", ""));
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

}