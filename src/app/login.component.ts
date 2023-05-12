import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { DataService } from "./data.service";
import { CookieService } from "ngx-cookie-service";
import { Token } from './tokenItem';
import { Router } from '@angular/router';


@Component({
    selector: 'login-comp',
    templateUrl: './login.component.html',
    styleUrls: ['./items.component.css'],
    providers: [ToDoService]

})
export class LoginComponent{
    constructor(private todoService:ToDoService, private router:Router){}

    tempUserLogin:string;
    tempUserPassword:string;
    userCreate:User = new User("","",0,"","","","")
    userFlag:boolean = false;
    userMessage:string;

    getUserId(userLogin: string, userPassword: string) {
        this.todoService.getUserId(userLogin, userPassword);
        this.goToDo()
    }

    createUser(user: User) {
        this.userCreate.login = this.tempUserLogin;
        this.userCreate.password = this.tempUserPassword;
        this.todoService.createrUser(user).subscribe({
            next: (res:Response) => {
                if(res.status === 200){
                    this.userFlag = true;
                    this.userMessage = `Новый пользователь ${this.userCreate.login} успешно создан!`;
                }
            },
            error: (error:Error) => this.userMessage = error.message
        })
    }
    
    goToDo(){
        this.router.navigate(['/item'],{
            queryParams: {
                'login': this.tempUserLogin,
                'password': this.tempUserPassword
            }
        }
    )}
}
                                         