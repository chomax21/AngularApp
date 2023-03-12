import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';

@Component({
    selector: 'chield-comp',
    templateUrl: "./child.component.html",
    styleUrls: [`./child.component.css`],
    providers: [HttpClient, ToDoService]
})
export class ChildComponent{
    constructor(private http: HttpClient, private todoService: ToDoService) { }

    item: ToDoItem = new ToDoItem(0,0,"Пока тут пусто =(");
    buttonReady: boolean = true;

    saveToDo(item: ToDoItem) {        
        this.todoService.createToDoItem(item).subscribe({
            next: (data: any) => { console.log(this.item.Case + " sending") },
            error: error => console.log(error)
        });
        item.Case = "";
    }
    logToDo() {

        console.log(this.item.Id + "_" + this.item.Case);
    }

    getUser(){

    }

}