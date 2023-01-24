export class DataService{
    getUserById(id: number){

    }
}


export class User{
    constructor(public id:number, public age: number, public firstName: string, public middleName: string, public lastName: string,
        public hobby: string, public city: string){
    }
}

let Users: User[];