import { Injectable } from "@angular/core";
import { StorageServide } from "./storage.service";


interface session {
    jwt: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthStateService {
    constructor(private readonly _storageService: StorageServide) { }

    getSession(): session | null {
        let currentSession: session | null = null;

        const maybeSession = this._storageService.get<session>('session');
        console.log("🚀 ~ AuthStateService ~ getSession ~ maybeSession:", maybeSession)

        if(maybeSession !== null){
            if(this._isValidSession(maybeSession)){
                currentSession=maybeSession;
            }else{
                //signout
                this.signOut();
            }
        }

        return currentSession;
    }

    signOut(){
        this._storageService.remove('session');
    }

    private _isValidSession(maybeSession: unknown):boolean {
        return (typeof maybeSession === 'object' && maybeSession !== null && 'jwt' in maybeSession);
    }
}