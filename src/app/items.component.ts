import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ToDoService } from './ToDoService'
import { ToDoItem } from './ToDoItem';
import { User } from './User';
import { DataService } from "./data.service";
import { CookieService } from "ngx-cookie-service";
import { Token } from './tokenItem';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
    selector: 'items-comp',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css'],
    providers: [ToDoService, DataService, CookieService]

})
export class ItemsComponent implements OnInit, OnDestroy {

    constructor(private todoService: ToDoService, private dataService: DataService, private cookie: CookieService, private router:Router, private route: ActivatedRoute) {
        this.querySubscripton = route.queryParams.subscribe(
            (queryParam: any) => {
                this.tempUserLogin = queryParam['login'];
                this.tempUserPassword = queryParam['password'];
            }
        )
        this.getUserId(this.tempUserLogin,this.tempUserPassword);
     }

    ngOnDestroy(): void {

    }
    ngOnInit(): void {

    }
    
    private querySubscripton: Subscription;
    tempUserId: string;
    jwt:string;
    tempUserLogin: string;
    tempUserPassword: string;
    doListItems: ToDoItem[];
    userCreate: User = new User("", "", 0, "", "", "", "");
    haveValues: boolean = true;
    haveName: boolean = false;
    changeToggle: boolean = false;
    item: ToDoItem = new ToDoItem(0, 0, " ", " "," ");
    token = new Token("","");


    setUserId() {
        this.dataService.UserIdFromService(this.tempUserId);
    }


    checkHaveToken(): boolean{
        this.todoService.id$.subscribe((id) => {
            this.tempUserId = id;        
        })

        if(this.tempUserId){           
            console.log(this.tempUserId + "ПРИШЕЛ В КОМПОНЕНТ");
            return true;
        }        
        else{
          console.log("ERROR IN CHECKMETHOD");  
          return false;  
        } 
    }


    getItems(){
        if (this.tempUserId) {
            this.todoService.getDoLists(this.tempUserId).subscribe({
                next: (data: ToDoItem[]) => {
                    this.doListItems = data;
                    this.doListItems = this.setPriority(this.doListItems);                                    
                    console.log(this.doListItems);
                },
                error: error => console.log(error)
            });
        }
        else {
            console.log("Error, not found ID");
        };
    }

    setPriority(items:ToDoItem[]):ToDoItem[]{
        items.forEach(function (value) {
            switch (value.Priority) {
                case 0:
                    value.stringPriority = "Высокий"
                    break;
                case 1:
                    value.stringPriority = "Средний"
                    break;
                case 2:
                    value.stringPriority = "Низкий"
                    break;
            }
        })
        return this.doListItems;
    }

    logout() {
        localStorage.removeItem('jwt');
        this.router.navigate(['/login']);
    }

  /*   // Создаем пользователя.
    createUser(user: User) {
        this.userCreate.login = this.tempUserLogin;
        this.userCreate.password = this.tempUserPassword;
        this.todoService.createrUser(user).subscribe();
    } */


    // Получаем Id и JWToken пользователя. Вся логика описана в сервисе.
    getUserId(userLogin: string, userPassword: string) {
        this.todoService.getUserId(userLogin, userPassword);
        let result = this.checkHaveToken();
    }

    // Сохраняем изменения в элементе todo.
    saveToDo(item: ToDoItem) {
        item.userId = this.tempUserId;
        console.log(item.userId);
        this.todoService.createToDoItem(item).subscribe({
            next: (data: any) => { console.log(this.item.Case + " sending") },
            error: error => console.log(error)
        });
        item.Case = "";
        item.Id = 0;
    }

    // Изменяем изменения в элементе todo.
    changeToDo(doItem: ToDoItem){
        doItem.Case = this.item.Case;
        doItem.Priority = this.item.Priority;
        doItem.userId = this.tempUserId;
        this.todoService.changeDoList(doItem).subscribe({
            error: error => console.log(error)            
        });

    }

    logToDo() {
        console.log(this.item.Id + "_" + this.item.Case);
        this.haveValues = !this.haveValues;
        this.haveName = !this.haveName;
    }
}
