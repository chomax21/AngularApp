import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'priority'
})
export class PriorityPipe implements PipeTransform{
    transform(value: number, ...args: any[]): string {
        let result:string = "";
        switch (value) {
            case 0:
                result ="Высокий"
                break;
            case 1:
                result ="Средний"
                break;
            case 2:
                result ="Низкий"
                break;
        }
        return result;
    }
}