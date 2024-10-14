import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";


interface User {
    id: string,
    email: string
}
interface UserResponse {
    id: string,
    email: string
    password?:string
}

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private readonly _http: HttpClient) { }


    getUsers(): Observable<User[]> {

        return this._http.get<UserResponse[]> (`${environment.API_ULR}/auth/users`).pipe(
            map((response) => {
                console.log(response);

                return response.map(user => ({ id: user.id, email: user.email }));
            }),
            tap(value => console.log(value))
        );
    }

}   