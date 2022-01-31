export class StorageService {
  
  static setData(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  static getData(data: any, key: string) {
    const storedData =  JSON.parse(localStorage.getItem(key) || '{}');
    if(Object.keys(storedData).length !== 0) {
      return storedData;
    } else {
      localStorage.setItem(key, JSON.stringify(data));
      return JSON.parse(localStorage.getItem(key) || '{}');
    }


  }
}
