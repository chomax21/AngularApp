import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Token } from './tokenItem'


@Injectable({providedIn: 'root'})
export class ToDoService{
    constructor(private http: HttpClient) { }

    public UserId:string = "ID не пришел =(!";

    createToDoItem(item:ToDoItem){
        return this.http.post("https://localhost:7218/api/item", item);
    }

    getUserId(login:string, password:string)/* : Observable<Token[]> */{
        return this.http.get('https://localhost:7218/api/user-id?login=' + login + '&password=' + password)
        /* .pipe(map((responce:any) => {
            let token = responce["value"];
            if(token){
                return token.map(function(item:any): Token{
                    return new Token(item.acces_token, item.id);
                })}
                return null
        })) */;
    }

    getDoLists(Id:string): Observable<ToDoItem[]>{
        return this.http.get('https://localhost:7218/api/ready-item?UserId=' + Id).pipe(map((responce:any) => {
            let itemList = responce["value"];
            if(itemList){
                return itemList.map(function(item:any): ToDoItem{
                    return new ToDoItem(item.id, item.priority, item.case, item.userid,"");
                })}
            return []
        }));
    }

    createrUser(user:User){
        return this.http.post("https://localhost:7218/api/user", user,{
            params: new HttpParams()
        });
    }

    changeDoList(item:ToDoItem, apiHeaders:HttpHeaders){
        return this.http.put("https://localhost:7218/api/item", item, {
            headers: apiHeaders
        });
    }

    deleteDoListItem(id:number, apiHeaders:HttpHeaders){
        return this.http.delete("https://localhost:7218/api/item", {
            params: new HttpParams().set(`id`,id),
            headers: apiHeaders            
        });
    }

}
