export class Task {
    public id: number;
    public name: string;
    public completed: boolean;
    public dueDate: String;

    constructor(name: string, completed: boolean = false, dueDate: String) {
        this.name = name;
        this.completed = completed;
        this.dueDate = dueDate;
    }

}