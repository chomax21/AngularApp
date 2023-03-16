import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService{
    public UserId$ = new Subject<string>();

    public UserIdFromService(id: string){
        this.UserId$.next(id);
    }
}
