import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators'
import {User} from './user';

 
@Component({
    selector: 'my-app',
    template: `<p>ID: {{user?.id}}</p>
    <p>Age: {{user?.age}}</p>
    <p>FirstName: {{user?.firstName}}</p>`
})


export class AppComponent implements OnInit {
    constructor(private http: HttpClient){}

    user: User | undefined 

    ngOnInit(){
       this.http.get('https://localhost:7218/User/GetUser/2').subscribe({next: (data: any) => this.user = new User(data.id, data.age, data.firstName)});
    }     
}