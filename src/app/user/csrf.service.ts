import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CsrfService {
    private csrfToken: string | null = null;

    constructor(private http: HttpClient){}

    loadCsrfToken() {
        return this.http.get<any>('/').pipe(
            tap((data) => {
                this.csrfToken = data.token;
            })
        );
    }

    getToken(): string | null {
        return this.csrfToken;
    }
}