import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { DataService } from "./data.service";
import { CookieService } from "ngx-cookie-service";


@Component({
    selector: 'items-comp',
    templateUrl: './items.component.html',
    providers: [HttpClient, ToDoService, CookieService]
})
export class ItemsComponent implements OnInit, OnDestroy{
    constructor(private todoService: ToDoService, private dataService: DataService, private cookie:CookieService) { }

    ngOnDestroy(): void {
        this.cookie.delete("userId");
    }
    ngOnInit(): void {
        let cook:string = this.cookie.get("userId");
        if(cook){
            this.haveValues = !this.haveValues;
            this.haveName = !this.haveName;
        }
        console.log(cook);
    }

    tempUserId:string;
    tempUserLogin:string;
    tempUserPassword:string;
    doListItems:ToDoItem[];
    userCreate:User = new User("","",0,"","","","");
    haveValues:boolean = true;
    haveName:boolean = false;
    item: ToDoItem = new ToDoItem(0,0,"Пока тут пусто =(","nothing");


    setUserId(){
        this.dataService.UserIdFromService(this.tempUserId);
    }


    getItems(){
        this.tempUserId = this.cookie.get("UserId");
        if(this.tempUserId){
            this.todoService.getDoLists(this.tempUserId).subscribe({
                next: (data: ToDoItem[]) => { this.doListItems = data;
                console.log(this.doListItems) },
                error: error => console.log(error)
            });
        }
        else{
            console.log("Error, not found ID");
            //this.haveValues = !this.haveValues;
            //this.haveName = !this.haveName;
        }        
    }

    logout(){
        this.cookie.delete("UserId");
        this.haveValues = !this.haveValues;
        this.haveName = !this.haveName;
    }

    createUser(user:User){
        this.userCreate.login = this.tempUserLogin;
        this.userCreate.password = this.tempUserPassword;
        this.todoService.createrUser(user).subscribe();
    }

    getUserId(userLogin:string, userPassword:string){
        this.todoService.getUserId(userLogin, userPassword).subscribe({
            next: (data: any) => 
                { this.tempUserId = data.value;
                  this.cookie.set("UserId", data.value)},
            error: error => console.log(error)
        });
        if(this.tempUserId){
            this.haveValues = !this.haveValues;
            this.haveName = !this.haveName;
        }
    }
    
    setName(){
        this.userCreate.firstName = "Max";
        this.userCreate.login = "max"
        this.haveName = true;
        console.log(this.haveName);        
    }  
    
    saveToDo(item: ToDoItem) {
        item.userId = this.tempUserId;
        console.log(item.userId);       
        this.todoService.createToDoItem(item).subscribe({
            next: (data: any) => { console.log(this.item.Case + " sending") },
            error: error => console.log(error)
        });
        item.Case = "";
        item.Id = 0;
    }
    logToDo(){
        console.log(this.item.Id + "_" + this.item.Case);
    }
}