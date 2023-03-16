import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { DataService } from "./data.service";


@Component({
    selector: 'items-comp',
    templateUrl: './items.component.html',
    providers: [HttpClient, ToDoService, ]
})
export class ItemsComponent{
    constructor(private todoService: ToDoService, private dataService: DataService) { }

    tempUserId:string = "пусто!";
    tempUserLogin:string;
    tempUserPassword:string;
    doListItems:ToDoItem[];
    userCreate:User = new User("","",0,"","","","");
    haveValues:boolean = false;
    haveName:boolean = false;
    item: ToDoItem = new ToDoItem(0,0,"Пока тут пусто =(","nothing");

    itemWork(){
        this.haveValues = !this.haveValues;
    }

    setUserId(){
        this.dataService.UserIdFromService(this.tempUserId);
    }


    getItems(Id:string){
        this.todoService.getDoLists(Id).subscribe({
            next: (data: ToDoItem[]) => { this.doListItems = data;
            console.log(this.doListItems) },
            error: error => console.log(error)
        });
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
                this.setUserId(); },
            error: error => console.log(error)
        });
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