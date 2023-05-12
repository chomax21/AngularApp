import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent}   from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ItemsComponent } from './items.component';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';
import { PriorityPipe } from './priority.pipe';
import { LoginComponent } from './login.component'
import {Routes, RouterModule} from '@angular/router';

import { InterseptorService } from './interceptor.Service';
import { ToDoService } from './ToDoService';

// определение маршрутов.
const appRouts: Routes = [
    {path: '', component: LoginComponent},
    {path: 'item', component: ItemsComponent},
    {path: '**', component: LoginComponent},
]

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRouts)],
    declarations: [ AppComponent, ItemsComponent, PriorityPipe, LoginComponent ],
    providers:    [DataService, CookieService, ToDoService, {
        provide: HTTP_INTERCEPTORS,
        useClass: InterseptorService,
        multi: true,
      },],
    bootstrap:    [ AppComponent ]
})
export class AppModule {
    
 }