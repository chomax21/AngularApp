import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from './tokenItem'


@Injectable({providedIn: 'root'})
export class ToDoService{
    constructor(private http: HttpClient) { }

    public UserId:string = "ID не пришел =(!";

    public JwtToken:string = "";

    public id$ = new Subject<string>();

    public getToken():string{
        if(this.JwtToken){
            console.log("------> JWT ЕСТЬ!")
            return this.JwtToken;
        }
        else{
            console.log("------> JWT NOT FOUND!!!")
        }
    }

    createToDoItem(item:ToDoItem){
        return this.http.post("https://localhost:7218/api/item", item);
    }

    getUserId(login:string, password:string){
        return this.http.get('https://localhost:7218/api/user-id?login=' + login + '&password=' + password).subscribe({
            next: (data: any) => {
                   let value = data["value"];
                   let token = value["acces_token"];
                   let id = value["id"];
                   this.JwtToken = token;
                   localStorage.setItem("jwt", token);
                   this.id$.next(id);
                   console.log(token + '<---TOKEN тут!');  
                   console.log(id + '<---ID тут!');  
            },
            error: error => console.log(error)
        });
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

    changeDoList(item:ToDoItem){
        return this.http.put("https://localhost:7218/api/item", item);
    }

    deleteDoListItem(id:number){
        return this.http.delete("https://localhost:7218/api/item", {
            params: new HttpParams().set(`id`,id),           
        });
    }

}
