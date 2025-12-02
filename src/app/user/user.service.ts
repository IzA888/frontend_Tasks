import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url ="http://127.0.0.1:8080";

    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(`${this.url}/user/save`, user, {
            observe: 'response'
        })
    }

    getUser(id: number): Observable<User>{
        return this.http.get<User>(`${this.url}/user/${id}`);
    }

    editUser(id: number, user: User): Observable<User>{
        return this.http.put<User>(`${this.url}/user/${id}`, user)
    }
    
    deleteUser(id: number): Observable<User>{
        return this.http.delete<User>(`${this.url}/user/${id}`);
    }

    loginUser(user: User): Observable<HttpResponse<User>>{
        return this.http.post<User>(`${this.url}/user/login`, user, {
            observe: 'response'
        });
    }

    saveToken(token: string){
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

}