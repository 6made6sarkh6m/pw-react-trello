export class StorageService {
  
  static getData(defaultMockData: any, key: string) {
    const storedData = localStorage.getItem(key);
    if(storedData) {
      return JSON.parse(storedData);
    } else {
      return defaultMockData;
    }


  }
};
