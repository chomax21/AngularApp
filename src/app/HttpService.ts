import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ToDoItem } from './ToDoItem';




export class HttpService {

    constructor(private http: HttpClient) { }


    
}
