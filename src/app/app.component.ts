import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [`./app.component.css`],
    providers: [HttpClient, ToDoService]
})



export class AppComponent {
    working:boolean = true;
    goWork(){
        this.working = !this.working;
    }
}