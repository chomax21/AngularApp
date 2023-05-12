import { Injectable, Pipe } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToDoService } from './ToDoService';

@Injectable({providedIn: 'root'})
export class InterseptorService implements HttpInterceptor {
    constructor(private toDoService:ToDoService){
    }

    

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
        let jwtStorage:string;

        jwtStorage = localStorage.getItem("jwt");

        if(jwtStorage)
            console.log(jwtStorage + "INTERSEPTOR")
        else
        console.log("LOST SOMEWHERE");

        const authRequest = req.clone({headers: req.headers.set("Authorization","Bearer " + jwtStorage)})
        return next.handle(authRequest)
    }
}


