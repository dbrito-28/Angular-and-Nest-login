import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStateService } from "../data-access/auth.state.service";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";



export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {

    const authState = inject(AuthStateService);
    const router = inject(Router)
    const token = authState.getSession();
    console.log("🚀 ~ token:", token)

    if (token) {
        
    }else{

    }
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token?.jwt}`
        }
    })
    return next(request).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401 ){
                authState.signOut()
                router.navigateByUrl('/auth/log-in')
            }
            return throwError(error);
        })
    );
}