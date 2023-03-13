import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';


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

    getItems(Id:string){
        this.todoService.getDoLists(Id).subscribe({
            next: (data: any) => { console.log("recieve doList") },
            error: error => console.log(error)
        });
    }

    createUser(){
        
    }

    getUserId(userLogin:string, userPassword:string){
        this.todoService.getUserId(userLogin, userPassword).subscribe({
            next: (data: any) => { this.tempUserId = data.value },
            error: error => console.log(error)
        });
    }
}