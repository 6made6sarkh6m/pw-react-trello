import { mockData } from "../utils/mock";
export class StorageService {
    
    static hasToDolists() {
        return !!localStorage.getItem('lists');
    }
    static getToDoLists() {
        if(!this.hasToDolists()) {
            localStorage.setItem('lists', JSON.stringify(mockData))
        }
        return JSON.parse(localStorage.getItem('lists') || '');
    }

    static updateList(key: number, newTitle: string) {
        const listItems = this.getToDoLists();

    }
    

}
