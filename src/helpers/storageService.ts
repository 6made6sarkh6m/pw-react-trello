export class StorageService {
    
    static hasToDolists() {
        return !!localStorage.getItem('lists');
    }
    static getToDoLists() {
        return JSON.parse(localStorage.getItem('lists') || '');
    }

}
