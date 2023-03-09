import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';


@Injectable()
export class ToDoService{
    constructor(private http: HttpClient) { }

    createToDoItem(id:number, message:string, priority:number){
        const body = {id: id, message: message, priority: priority}
        return this.http.post("https://localhost:7218/api/create", body);
    }
}
