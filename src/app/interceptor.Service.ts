import { Injectable, Pipe } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToDoService } from './ToDoService';
import { Token } from './tokenItem';

@Injectable({providedIn: 'root'})
export class InterseptorService implements HttpInterceptor {
    constructor(private toDoService:ToDoService){
    }

    

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
        let jwt:string;
        let jwtMethod:string;
        let jwtStorage:string;

        this.toDoService.token$.subscribe((token) => {
            jwt = token;
        })

        jwtMethod = this.toDoService.getToken();
        jwtStorage = localStorage.getItem("jwt");

        if(jwt)
            console.log(jwt + "INTERSEPTOR")
        else if(jwtStorage){
          console.log(jwtStorage + "STORAGE")
        }
        else
        console.log("LOST SOMEWHERE");

        const authRequest = req.clone({headers: req.headers.set("Authorization","Bearer " + jwtStorage)})
        return next.handle(authRequest)/* .pipe(
            tap(
              (event) => {
                if (event instanceof HttpResponse)
                  console.log('Server response')
              },
              (err) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status == 401)
                    console.log('Unauthorized')
                }
              }
            )); */
    }
}


