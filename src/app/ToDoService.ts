import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';


@Injectable()
export class ToDoService{
    constructor(private http: HttpClient) { }

    httpHeaders = new HttpHeaders().set('Media type', 'text/plain');

    createToDoItem(item:ToDoItem){
        return this.http.post("https://localhost:7218/api/create", item);
    }

}
