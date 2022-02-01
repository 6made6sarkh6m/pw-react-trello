export class StorageService {
  
  static setData(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  };

  static getData(defaultMockData: any, key: string) {
    const storedData = localStorage.getItem(key);
    if(storedData) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem(key, JSON.stringify(defaultMockData));
      return defaultMockData;
    }


  }
}
