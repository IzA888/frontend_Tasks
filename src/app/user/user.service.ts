import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<User> {
        return this.http.post<User>('/user', user)
    }

    getUser(id: number): Observable<User>{
        return this.http.get<User>(`/user/${id}`);
    }

    editUser(id: number, user: User): Observable<User>{
        return this.http.put<User>(`/user/${id}`, user)
    }
    
    deleteUser(id: number): Observable<User>{
        return this.http.delete<User>(`/user/${id}`);
    }
}