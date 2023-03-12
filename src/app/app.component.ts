import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';

@Component({
    selector: 'my-app',
    template: `<div><div>
        <label for="Id">ID</label>
        <input type="number" name="Id" [(ngModel)]="item.Id">
    </div>
    <div>
        <label for="Case">Message</label>
        <input type="text" name="Case" [(ngModel)]="item.Case">
    </div>
    <div>
        <label for="Priority">Priority</label>
        <input type="number" name="Priority" [(ngModel)]="item.Priority">
    </div>
    <div>
        <button (click)="saveToDo(item)">Save</button>
    </div>
    <div>
        <button (click)="logToDo()">Log</button>
    </div>    
</div>`,
    providers: [HttpClient, ToDoService]
})



export class AppComponent {
    constructor(private http: HttpClient, private todoService: ToDoService) { }

    item: ToDoItem = new ToDoItem(0,0,"Пока тут пусто =(");

    //id: number = 0;
    //message: string = "пусто";
    //priority: number = 0;

    FirstName: string = ""; 
    LastName: string = "";
    City: string = "";
    Hoby: string = "";
    Age: number = 0;

    saveToDo(item: ToDoItem) {        
        this.todoService.createToDoItem(item).subscribe({
            next: (data: any) => { console.log(this.item.Case + " sending") },
            error: error => console.log(error)
        });
    }
    logToDo() {

        console.log(this.item.Id + "_" + this.item.Case);
    }

    getUser(){

    }
}