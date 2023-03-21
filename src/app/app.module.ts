import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent}   from './app.component';
import { ChildComponent } from './child.component'
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './items.component';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';
import { PriorityPipe } from './priority.pipe'

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, ChildComponent, ItemsComponent, PriorityPipe ],
    providers:    [DataService, CookieService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }