import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from './user';




@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
        return this.http.get('https://localhost:7218/User/GetUser/1').pipe(map((data: any) => {
            let user = data;
            return user.map(function (user: any): User {
                return new User(data.id, data.age, data.firstName, data.lastName, data.middleName, data.hobby, data.city);
            });
        }));
    }
}
