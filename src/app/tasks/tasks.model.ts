export class Task {
    public id!: number;
    public name: string;
    public date: String;
    public completed: boolean;

    constructor(name: string, date: String, completed: boolean = false) {
        this.name = name;
        this.date = date;
        this.completed = completed;
    }

}