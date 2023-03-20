import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ToDoService{
    constructor(private http: HttpClient) { }

    public UserId:string = "ID не пришел =(!";

    createToDoItem(item:ToDoItem){
        return this.http.post("https://localhost:7218/api/create", item);
    }

    getUserId(login:string, password:string){
        return this.http.get('https://localhost:7218/api/get-user-id?login=' + login + '&password=' + password);
    }

    getDoLists(Id:string): Observable<ToDoItem[]>{
        return this.http.get('https://localhost:7218/api/get-ready?UserId=' + Id).pipe(map((responce:any) => {
            let itemList = responce["value"];
            if(itemList){
                return itemList.map(function(item:any): ToDoItem{
                    return new ToDoItem(item.id, item.priority, item.case, item.userid,"");
                })}
            return []
        }));
    }

    createrUser(user:User){
        return this.http.post("https://localhost:7218/api/create-user", user);
    }

}
