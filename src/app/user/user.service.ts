import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscribable } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url ="http://localhost:8080";

    constructor(private http: HttpClient) {}

    private userSubject = new BehaviorSubject<User | null>(null);

    setUser(user: User){
        this.userSubject.next(user);
        console.log("setUset disparou", user);
    }

    getUser$(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    getLoggedUser(): Observable<User> {
        return this.http.get<User>(`${this.url}/user/me`, { withCredentials: true })
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
        return this.http.put<User>(`${this.url}/user/${id}`, user, { withCredentials: true })
    }
    
    deleteUser(id: number): Observable<User>{
        return this.http.delete<User>(`${this.url}/user/${id}`, { withCredentials: true });
    }

    loginUser(user: User): Observable<HttpResponse<User>>{
        return this.http.post<User>(`${this.url}/user/login`, user, {
            observe: 'response',
            withCredentials: true
        });
    }

    saveToken(token: string){
        sessionStorage.setItem('token', token.replace("Bearer ", ""));
        console.log(localStorage.getItem("token"));
    }

    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    clearToken() {
        sessionStorage.removeItem("token");
        this.userSubject.next(null);
    }
}