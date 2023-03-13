import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent}   from './app.component';
import { ChildComponent } from './child.component'
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './items.component';


@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ AppComponent, ChildComponent, ItemsComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }