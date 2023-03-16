import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { User } from './User';


@Component({
    selector: 'items-comp',
    templateUrl: './items.component.html',
    //styleUrls: [`./items.component.css`]
})
export class ItemsComponent{
    constructor(private todoService: ToDoService) { }

    tempUserId:string = "пусто!";
    tempUserLogin:string;
    tempUserPassword:string;
    doListItems:ToDoItem[];
    userCreate:User = new User("","",0,"","","","");
    haveValues:boolean = false;
    haveName:boolean = false;

    itemWork(){
        this.haveValues = !this.haveValues;
    }


    getItems(Id:string){
        this.todoService.getDoLists(Id).subscribe({
            next: (data: any) => { console.log("recieve doList") },
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
            next: (data: any) => { this.tempUserId = data.value;
                                this.todoService.UserId = this.tempUserId },
            error: error => console.log(error)
        });
    }
    
    setName(){
        this.userCreate.firstName = "Max";
        this.userCreate.login = "max"
        this.haveName = true;
        console.log(this.haveName);        
    }    
}