import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InterseptorService implements HttpInterceptor {
    constructor(){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }

    addAuthToken(request: HttpRequest<any>){
        const token = localStorage.getItem("jwt");
        if(token){
            return request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            })
        }
    }
}
