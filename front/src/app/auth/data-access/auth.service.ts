import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { StorageServide } from "../../shared/data-access/storage.service";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private readonly _http: HttpClient, private storage: StorageServide) { }

    singUp(email: string, password: string): Observable<any> {
        return this._http.post(`${environment.API_ULR}/auth/sign-up`, { email, password }).pipe(tap((response) => this.storage.set('session', JSON.stringify(response))));
    }

    logIn(email: string, password: string): Observable<any> {
        return this._http.post(`${environment.API_ULR}/auth/login`, { email, password }).pipe(
            tap((response) => {
                console.log("🚀 ~ logIn ~ response:", response);  
                this.storage.set('session', response);  
            })
        );
    }
    

}