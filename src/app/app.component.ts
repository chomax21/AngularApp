import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';

@Component({
    selector: 'my-app',
    template: `<form>
    <div>
    <div>
        <label for="id">ID</label>
        <input type="number" name="id" [(ngModel)]="id">
    </div>
    <div>
        <label for="message">Message</label>
        <input type="text" name="message" [(ngModel)]="message">
    </div>
    <div class="form-control">
        <label for="priority">Priority</label>
        <input type="number" name="priority" [(ngModel)]="priority">
    </div>
    <div class="form-group">
        <button (click)="saveToDo()">Save</button>
    </div>
    <div class="form-group">
        <button (click)="logToDo()">Log</button>
    </div>    
</div>
</form>`,
    providers: [HttpClient, ToDoService]
})



export class AppComponent {
    constructor(private http: HttpClient, private todoService: ToDoService) { }

    id: number = 0;
    message: string = "пусто";
    priority: number = 0;

    saveToDo() {        
        this.todoService.createToDoItem(this.id,this.message,this.priority).subscribe({
            next: (data: any) => { console.log(this.message + " sending") },
            error: error => console.log(error)
        });
    }
    logToDo() {

        console.log(this.id + "_" + this.message);
    }
}