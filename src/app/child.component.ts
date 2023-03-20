import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { DataService } from "./data.service";

@Component({
    selector: 'chield-comp',
    templateUrl: "./child.component.html",
    styleUrls: [`./child.component.css`],
    providers: [HttpClient, ToDoService, DataService]
})
export class ChildComponent{
    constructor(private http: HttpClient, private todoService: ToDoService, private dataService: DataService) { }

    item: ToDoItem = new ToDoItem(0,0,"Пока тут пусто =(","nothing","");
    buttonReady: boolean = true;
    

    saveToDo(item: ToDoItem) {
        this.dataService.UserId$.subscribe((id) => this.item.userId = id); 
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