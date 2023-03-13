import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable()
export class ToDoService{
    constructor(private http: HttpClient) { }

    createToDoItem(item:ToDoItem){
        return this.http.post("https://localhost:7218/api/create", item);
    }

    getUserId(login:string, password:string){
        return this.http.get('https://localhost:7218/api/get-user-id?login=' + login + ',password=' + password);
    }

    getDoLists(Id:string): Observable<ToDoItem[]>{
        return this.http.get('https://localhost:7218/api/getnotready?Id=' + Id).pipe(map((data:any)=>{
            let itemList = data["Values"];
            return itemList.map(function(item:any):ToDoItem{
                return new ToDoItem(item.Id, item.Priority, item.Case);
            })
        }));
    }

    createrUser(){
        
    }

}
