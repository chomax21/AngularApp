import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
import { ToDoItem } from './ToDoItem';

 
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})


export class AppComponent implements OnInit {
    constructor(private http: HttpClient){}

    
    ngOnInit(){
       
    }     
}